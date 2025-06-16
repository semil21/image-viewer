import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyUserAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(404).send({ result: "No token found" });
      return;
    }

    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        res.status(400).send({ result: "Invalid token" });
        return;
      }

      const { id, } = decoded as {
        id: string;
      };

      req.body.id = id
      next();
    });
  } catch (error) {
    res.status(500).send({ result: "Server error, failed to verify token" });
  }
};

export default verifyUserAuthToken;