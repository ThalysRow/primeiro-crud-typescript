import { knex } from "../database/conextion";
import { Request, Response, NextFunction } from "express";

export const verifyCar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const car = await knex("cars").where("id", id).first();
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error in verify car" });
  }
};
