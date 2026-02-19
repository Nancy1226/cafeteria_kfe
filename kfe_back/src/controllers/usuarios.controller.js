import * as usuariosModel from "../models/usuarios.model.js";
import { hashPassword } from "../utils/hash.js";

// Lista todos los usuarios (solo admin en rutas)
export const list = async (_req, res, next) => {
  try {
    const [rows] = await usuariosModel.getAll();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// Crea usuario (admin o cajero según ruta)
export const create = async (req, res, next) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const hashed = await hashPassword(password);
    const [result] = await usuariosModel.create({ nombre, email, password: hashed, rol });
    res.status(201).json({ id: result.insertId, nombre, email, rol });
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const [current] = await usuariosModel.getById(req.params.id);
    if (!current.length) return res.status(404).json({ msg: "Usuario no encontrado" });

    const hashed = password ? await hashPassword(password) : current[0].password;

    await usuariosModel.update(req.params.id, {
      nombre: nombre ?? current[0].nombre,
      email: email ?? current[0].email,
      password: hashed,
      rol: rol ?? current[0].rol
    });
    res.json({ msg: "Usuario actualizado" });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await usuariosModel.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
