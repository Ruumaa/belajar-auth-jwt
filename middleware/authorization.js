import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; //berisi ~> Bearer [TOKEN]
  const token = authHeader && authHeader.split(" ")[1]; //mengambil [TOKEN]
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json({ error: error.message });
    req.user = user;
    next();
  });
}

export { authenticateToken };
