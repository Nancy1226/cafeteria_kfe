import { Router } from "express";
import {
  list,
  get,
  create,
  update,
  remove
} from "../controllers/categorias.controller.js";
import validate from "../middlewares/validate.middleware.js";
import role from "../middlewares/role.middleware.js";

const router = Router();

router.get("/", list);
router.get("/:id", get);
router.post("/", role(["admin"]), validate(["nombre"]), create);
router.put("/:id", role(["admin"]), validate(["nombre"]), update);
router.delete("/:id", role(["admin"]), remove);



export default router;
