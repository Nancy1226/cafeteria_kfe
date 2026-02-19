import db from "../config/db.js";

export const createVenta = async (connection, usuarioId, total) => {
  const [result] = await connection.query(
    "INSERT INTO ventas (usuario_id, total) VALUES (?, ?)",
    [usuarioId, total]
  );
  return result.insertId;
};

export const addDetalle = async (connection, ventaId, item) => {
  await connection.query(
    `INSERT INTO detalle_venta (venta_id, producto_id, cantidad, precio_unitario, subtotal)
     VALUES (?, ?, ?, ?, ?)`,
    [ventaId, item.producto_id, item.cantidad, item.precio_unitario, item.subtotal]
  );
};

export const getVentasRango = (from, to) =>
  db.query(
    `SELECT 
        v.id AS venta_id,
        v.fecha,
        p.nombre AS producto,
        dv.cantidad,
        u.nombre AS cajero,
        dv.precio_unitario
     FROM ventas v
     INNER JOIN detalle_venta dv ON dv.venta_id = v.id
     INNER JOIN productos p ON p.id = dv.producto_id
     INNER JOIN usuarios u ON u.id = v.usuario_id
     WHERE v.fecha BETWEEN ? AND ?
     ORDER BY v.fecha DESC`,
    [from, to]
  );

export const getTopProductos = (limit = 3, desde = null, hasta = null) => {
  let sql = `
    SELECT p.id, p.nombre,
           SUM(dv.cantidad) AS cantidad_vendida,
           SUM(dv.subtotal) AS total
    FROM detalle_venta dv
    INNER JOIN productos p ON p.id = dv.producto_id
    INNER JOIN ventas v ON v.id = dv.venta_id`;

  const params = [];
  if (desde && hasta) {
    sql += " WHERE v.fecha BETWEEN ? AND ?";
    params.push(desde, `${hasta} 23:59:59`);
  }

  sql += `
    GROUP BY p.id, p.nombre
    ORDER BY cantidad_vendida DESC
    LIMIT ?`;
  params.push(limit);

  return db.query(sql, params);
};

export const getGraficaVentas = () =>
  db.query(
      `SELECT 
    p.nombre,
    SUM(dv.cantidad) AS total
  FROM detalle_venta dv
  JOIN productos p ON p.id = dv.producto_id
  GROUP BY p.nombre
  ORDER BY total DESC;`
  );
