import db from "../config/db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email]
  );
  return rows[0];
};

export const createUser = async ({ nombre, email, password, rol }) => {
  return db.query(
    "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
    [nombre, email, password, rol]
  );
};
