import pool from "../config/db.js";
import * as productosModel from "../models/productos.model.js";
import * as ventasModel from "../models/ventas.model.js";

/**
 * Crea una venta con detalles y descuenta stock en una sola transacción.
 * @param {number} usuarioId
 * @param {Array} items [{ producto_id, cantidad }]
 */
export const registrarVenta = async (usuarioId, items = []) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const lineas = [];
    for (const item of items) {
      const [[producto]] = await connection.query(
        "SELECT id, precio, stock FROM productos WHERE id = ?",
        [item.producto_id]
      );
      if (!producto) throw new Error(`Producto ${item.producto_id} no existe`);
      if (producto.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para producto ${producto.id}`);
      }
      const subtotal = producto.precio * item.cantidad;
      lineas.push({
        producto_id: producto.id,
        cantidad: item.cantidad,
        precio_unitario: producto.precio,
        subtotal
      });
    }

    const total = lineas.reduce((acc, l) => acc + l.subtotal, 0);
    const ventaId = await ventasModel.createVenta(connection, usuarioId, total);

    for (const linea of lineas) {
      await ventasModel.addDetalle(connection, ventaId, linea);
      await productosModel.updateStock(linea.producto_id, -linea.cantidad, connection);
    }

    await connection.commit();
    return { id: ventaId, total, items: lineas };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};
