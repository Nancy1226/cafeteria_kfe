import axios from "axios";

export const loginUser = async (values) =>
  axios.post("http://localhost:3000/api/auth/login", values);

export const registerUser = async (values) =>
  axios.post("http://localhost:3000/api/auth/register", values);

const http = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http;

// Productos
export const getAllProducts = async () => http.get("/productos"); 
export const createProduct = async (values) => http.post("/productos", values);
export const updateProduct = async (id, values) => http.put(`/productos/${id}`, values);
export const deleteProduct = async (id) => http.delete(`/productos/${id}`);

// Categorías 
export const getAllCategories = async () => http.get("/categorias");

//Ventas
export const createVenta = async (values) => http.post("/ventas", values);

// Reportes de Ventas

// Ventas por rango de fechas
export const getVentasPorFechas = async (desde, hasta) =>
  http.get("/ventas/reporte", { params: { desde, hasta } });

// Top 3 productos más vendidos
export const getTopProductos = async () =>
  http.get("/ventas/top");

// Datos para gráfica de ventas por producto
export const getGraficaVentas = async () =>
  http.get("/ventas/grafica");
