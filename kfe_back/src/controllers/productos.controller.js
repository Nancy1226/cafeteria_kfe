import * as productosModel from "../models/productos.model.js";

export const list = async (_req, res, next) => {
  try {
    const [rows] = await productosModel.getAll();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const [rows] = await productosModel.getById(req.params.id);
    if (!rows.length) return res.status(404).json({ msg: "Producto no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const [result] = await productosModel.create(req.body);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    await productosModel.update(req.params.id, req.body);
    res.json({ msg: "Producto actualizado" });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    await productosModel.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
