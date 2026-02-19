import { Router } from "express";
import {
  list,
  create,
  update,
  remove
} from "../controllers/usuarios.controller.js";
import validate from "../middlewares/validate.middleware.js";
import role from "../middlewares/role.middleware.js";

const router = Router();

router.get("/", role(["admin"]), list);
router.post("/", role(["admin", "cajero"]), validate(["nombre", "email", "password", "rol"]), create);
router.put("/:id", role(["admin"]), update);
router.delete("/:id", role(["admin"]), remove);

export default router;
