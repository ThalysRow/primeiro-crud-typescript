import { Request, Response, NextFunction } from "express";
import { knex } from "../database/conextion";
import { User } from "../types/types";

export const findEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const result = await knex<User>("user").where("email", email).first();
    if (result) {
      return res.status(400).json({ message: "This email is already in use" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Error in find email" });
  }
};