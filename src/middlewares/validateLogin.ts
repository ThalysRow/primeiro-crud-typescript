import { Request, Response, NextFunction } from "express";
import { findUser } from "../utils/functions";
import bcrypt from "bcrypt";

export const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await findUser(email);

    if (!user) {
      return res.status(500).json({ message: "invalid email or password" });
    }

    const pass = user!.password;

    const passCompare = await bcrypt.compare(password, pass);

    if (!passCompare) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro in validate login" });
  }
};
