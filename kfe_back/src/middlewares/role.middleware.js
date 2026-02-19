const role = (roles = []) => {
  const allowed = Array.isArray(roles) ? roles : [roles];

  return (req, res, next) => {
    if (!req.user || !allowed.includes(req.user.rol)) {
      return res.status(403).json({ msg: "No autorizado" });
    }
    next();
  };
};

export default role;
