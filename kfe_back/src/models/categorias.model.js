import db from "../config/db.js";

export const getAll = () => db.query("SELECT * FROM categorias");

export const getById = (id) => db.query("SELECT * FROM categorias WHERE id = ?", [id]);

export const create = (nombre) =>
  db.query("INSERT INTO categorias (nombre) VALUES (?)", [nombre]);

export const update = (id, nombre) =>
  db.query("UPDATE categorias SET nombre = ? WHERE id = ?", [nombre, id]);

export const remove = (id) => db.query("DELETE FROM categorias WHERE id = ?", [id]);
