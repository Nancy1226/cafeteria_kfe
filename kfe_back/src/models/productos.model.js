import db from "../config/db.js";

export const getAll = () =>
  db.query(
    `SELECT p.*, c.nombre AS categoria
     FROM productos p
     LEFT JOIN categorias c ON c.id = p.categoria_id`
  );

export const getById = (id) =>
  db.query(
    `SELECT p.*, c.nombre AS categoria
     FROM productos p
     LEFT JOIN categorias c ON c.id = p.categoria_id
     WHERE p.id = ?`,
    [id]
  );

export const create = (data) =>
  db.query(
    `INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id, imagen_url, activo)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [data.nombre, data.descripcion || null, data.precio, data.stock || 0, data.categoria_id || null, data.imagen_url, data.activo ?? true]
  );

export const update = (id, data) =>
  db.query(
    `UPDATE productos
     SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria_id = ?, imagen_url = ?, activo = ?
     WHERE id = ?`,
    [data.nombre, data.descripcion || null, data.precio, data.stock, data.categoria_id || null, data.imagen_url, data.activo ?? true, id]
  );

export const remove = (id) => db.query("DELETE FROM productos WHERE id = ?", [id]);

export const updateStock = (id, delta, connection = null) => {
  const executor = connection || db;
  return executor.query("UPDATE productos SET stock = stock + ? WHERE id = ?", [delta, id]);
};
