import * as categoriasModel from "../models/categorias.model.js";

export const list = async (_req, res, next) => {
  try {
    const [rows] = await categoriasModel.getAll();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const [rows] = await categoriasModel.getById(req.params.id);
    if (!rows.length) return res.status(404).json({ msg: "Categoría no encontrada" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    const [result] = await categoriasModel.create(nombre);
    res.status(201).json({ id: result.insertId, nombre });
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    await categoriasModel.update(req.params.id, nombre);
    res.json({ msg: "Categoría actualizada" });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await categoriasModel.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
