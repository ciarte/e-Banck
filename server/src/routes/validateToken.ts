import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers["authorization"];
  console.log(headerToken);
  if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
    try {
      const token = headerToken.slice(7)
      jwt.verify(token, process.env.JWT_SECRET || "password123")
      next();
    } catch (error) {
      res.status(401).json({ msg: "Unauthorized" });
    }
  }
};

export default validateToken;
