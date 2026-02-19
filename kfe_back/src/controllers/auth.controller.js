import jwt from "jsonwebtoken";
import * as authModel from "../models/auth.model.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { secret, expiresIn } from "../config/jwt.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authModel.findUserByEmail(email);

    if (!user)
      return res.status(401).json({ msg: "Usuario no existe" });

    const valid = await comparePassword(password, user.password);

    if (!valid)
      return res.status(401).json({ msg: "Password incorrecto" });

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      secret,
      { expiresIn }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json(err);
  }
};

export const register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  if (!["admin", "cajero"].includes(rol)) {
    return res.status(400).json({ msg: "Rol inválido (admin o cajero)" });
  }

  try {
    const exists = await authModel.findUserByEmail(email);
    if (exists) return res.status(409).json({ msg: "Email ya registrado" });

    const hashed = await hashPassword(password);
    const [result] = await authModel.createUser({ nombre, email, password: hashed, rol });

    const token = jwt.sign({ id: result.insertId, rol }, secret, { expiresIn });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json(err);
  }
};
