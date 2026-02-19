// Generic error handler
const errorMiddleware = (err, req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ msg: err.message || "Error interno" });
};

export default errorMiddleware;
