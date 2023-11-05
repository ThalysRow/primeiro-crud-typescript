import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { knex } from "../database/conextion";
import { User } from "../types/types";
import jwt from "jsonwebtoken";
import JWT_PASS from "../../env";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const encryptedPass = await bcrypt.hash(password, 10);

    await knex<User>("users").insert({ name, email, password: encryptedPass });

    return res.status(201).json({ message: "user created" });
  } catch (error) {
    return res.status(500).json({ message: "Error in create user" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const findUser = await knex<User>("users").where("email", email).first();

    if (!findUser) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    const passUser = findUser.password;
    const idUser = findUser.id;

    const passCompare = await bcrypt.compare(password, passUser);

    if (!passCompare) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    const token = jwt.sign({ id: idUser }, process.env.JWT_PASS, {
      expiresIn: 60 * 10,
    });

    const { password: _, ...userInfo } = findUser;

    return res.json({ userInfo, token });
  } catch (error) {
    return res.status(500).json({ message: "Error in login user" });
  }
};
