import { Router } from "express";
import {
  crearVenta,
  ventasPorFechas,
  topProductos,
  graficaVentas
} from "../controllers/ventas.controller.js";
import role from "../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/",
  (req, _res, next) => {
    console.log("METHOD:", req.method);
    console.log("CT:", req.headers["content-type"]);
    console.log("BODY:", req.body);
    next();
  },
  role(["admin", "cajero"]),
  crearVenta
);
router.get("/reporte", role(["admin"]), ventasPorFechas);
router.get("/top", role(["admin"]), topProductos);
router.get("/grafica", role(["admin"]), graficaVentas);



export default router;
