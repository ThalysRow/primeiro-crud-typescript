import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { knex } from "../database/conextion";
import { User } from "../types/tyes";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const encryptedPass = await bcrypt.hash(password, 10);
    await knex<User>("user").insert({ name, email, password: encryptedPass });
    return res.status(201).json({ message: "user created" });
  } catch (error) {
    return res.status(500).json({ message: "Error in create user" });
  }
};
