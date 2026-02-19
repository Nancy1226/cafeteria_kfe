import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import app from "./app.js";
import pool from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 3000;

async function testDB() {
  try {
    const connection = await pool.getConnection();
    console.log("Conectado a MySQL correctamente");
    connection.release();
  } catch (err) {
    console.error("Error conectando a MySQL:");
    console.error(err.message);
  }
}

testDB();

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});
