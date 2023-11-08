import { knex } from "../database/conextion";
import { Request, Response, NextFunction } from "express";
import { User } from "../types/types";

export const findUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await knex<User>("users").where("id", id).first();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error in find user id" });
  }
};
