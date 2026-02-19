import { Router } from "express";
import {
  list,
  get,
  create,
  update,
  remove
} from "../controllers/productos.controller.js";
import validate from "../middlewares/validate.middleware.js";
import role from "../middlewares/role.middleware.js";

const router = Router();

router.get("/", list);
router.get("/:id", get);
router.post("/", role(["admin", "cajero"]), validate(["nombre", "precio"]), create);
router.put("/:id", role(["admin", "cajero"]), validate(["nombre", "precio", "stock"]), update);
router.delete("/:id", role(["admin", "cajero"]), remove);

export default router;
