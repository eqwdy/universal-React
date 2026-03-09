import jwt from "jsonwebtoken";

const rolesHierarchy = {
  USER: 1,
  ADMIN: 2,
  OWNER: 3,
};

export default function (requiredRole) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      return next();
    }

    try {
      const token = req.cookies.jwt;
      if (!token) {
        return res.status(401).json({ message: "User without authorization" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({ message: "User without authorization" });
      }

      const userLevel = rolesHierarchy[decoded.role];
      const requiredLevel = rolesHierarchy[requiredRole];

      if (!userLevel || userLevel < requiredLevel) {
        return res.status(403).json({ message: "Not enough rights" });
      }

      req.user = decoded;
      next();
    } catch (e) {
      console.error(e);
      res.status(401).json({ message: "User without authorization" });
    }
  };
}
