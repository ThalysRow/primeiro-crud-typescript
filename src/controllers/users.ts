import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { knex } from "../database/conextion";
import { Car, User } from "../types/types";
import jwt from "jsonwebtoken";
import JWT_PASS from "../../env";
import { findUser, formateData } from "../utils/functions";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const encryptedPass = await bcrypt.hash(password, 10);
    const formatadeName = formateData(name);

    await knex<User>("users").insert({
      name: formatadeName,
      email,
      password: encryptedPass,
    });

    return res.status(201).json({ message: "user created" });
  } catch (error) {
    return res.status(500).json({ message: "Error in create user" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await findUser(email);
    const userId = user!.id;

    const token = jwt.sign({ id: userId }, process.env.JWT_PASS, {
      expiresIn: 60 * 10,
    });

    const { password: _, ...userInfo } = user!;

    return res.json({ userInfo, token });
  } catch (error) {
    return res.status(500).json({ message: "Error in login user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const pass = await bcrypt.hash(password, 10);
    const data = {
      name: formateData(name),
      email,
      password: pass,
    };

    await knex<User>("users").update(data).where("id", id);
    return res.status(201).json({ message: "updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error in update user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await knex<Car>("cars").where("user_id", id).delete();
    await knex<User>("users").where("id", id).delete();
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: "Error in delete user" });
  }
};
