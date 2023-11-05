import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { knex } from "../database/conextion";
import { User } from "../types/types";
interface CustomRequest extends Request {
  userId?: number; // Adicione a propriedade 'userId' ao Request
}

export const authentication = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({ message: "unauthenticated" });
    } else {
      const token = authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_PASS) as JwtPayload;
      req.userId = user.id;

      const userFind = await knex<User>("users")
        .where("id", req.userId)
        .first();
      if (!userFind) {
        return res.status(401).json({ message: "unauthenticated" });
      }
      next();
    }
  } catch (error) {
    return res.status(500).json({ message: "Error in authentication" });
  }
};
