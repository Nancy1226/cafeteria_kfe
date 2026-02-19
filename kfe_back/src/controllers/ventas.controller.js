import * as ventasModel from "../models/ventas.model.js";
import { registrarVenta } from "../services/venta.service.js";

export const crearVenta = async (req, res, next) => {
  try {
    const usuarioId = req.user.id;

    const { items } = req.body ?? {}; 

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ msg: "Se requieren items" });
    }

    const venta = await registrarVenta(usuarioId, items);
    return res.status(201).json(venta);
  } catch (err) {
    next(err);
  }
};

export const ventasPorFechas = async (req, res, next) => {
  try {
    const { desde, hasta } = req.query;
    if (!desde || !hasta) return res.status(400).json({ msg: "desde y hasta son requeridos (YYYY-MM-DD)" });
    const [rows] = await ventasModel.getVentasRango(desde, `${hasta} 23:59:59`);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const topProductos = async (req, res, next) => {
  try {
    const { fecha, desde, hasta, limit } = req.query;
    const top = Number(limit) > 0 ? Number(limit) : 3;

    if (fecha && (desde || hasta)) {
      return res.status(400).json({ msg: "Use solo fecha o el par desde/hasta, no ambos" });
    }
    if ((desde && !hasta) || (!desde && hasta)) {
      return res.status(400).json({ msg: "Use ambos parámetros desde y hasta, o ninguno" });
    }

    let rows;
    if (fecha) {
      [rows] = await ventasModel.getTopProductos(top, fecha, fecha);
    } else if (desde && hasta) {
      [rows] = await ventasModel.getTopProductos(top, desde, hasta);
    } else {
      [rows] = await ventasModel.getTopProductos(top, null, null);
    }
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const graficaVentas = async (_req, res, next) => {
  try {
    const [rows] = await ventasModel.getGraficaVentas();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
