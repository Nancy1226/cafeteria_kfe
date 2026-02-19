import db from "../config/db.js";

export const getAll = () =>
  db.query("SELECT id, nombre, email, rol FROM usuarios");

export const getById = (id) =>
  db.query("SELECT id, nombre, email, rol, password FROM usuarios WHERE id = ?", [id]);

export const create = ({ nombre, email, password, rol }) =>
  db.query(
    "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
    [nombre, email, password, rol]
  );

export const update = (id, { nombre, email, password, rol }) =>
  db.query(
    "UPDATE usuarios SET nombre = ?, email = ?, password = ?, rol = ? WHERE id = ?",
    [nombre, email, password, rol, id]
  );

export const remove = (id) => db.query("DELETE FROM usuarios WHERE id = ?", [id]);
