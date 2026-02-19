// Simple required-field validator for small payloads
const validate = (fields = []) => {
  return (req, res, next) => {
    const missing = fields.filter((f) => req.body[f] === undefined || req.body[f] === null || req.body[f] === "");
    if (missing.length) {
      return res.status(400).json({ msg: `Faltan campos: ${missing.join(", ")}` });
    }
    next();
  };
};

export default validate;
