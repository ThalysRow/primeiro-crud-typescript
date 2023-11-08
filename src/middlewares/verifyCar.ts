import { knex } from "../database/conextion";
import { Request, Response, NextFunction } from "express";
import { Car } from "../types/types";
interface CustomRequest extends Request {
  userId?: number;
}

export const verifyCar = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const car = await knex<Car>("cars").where("id", id).first();
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (car.user_id !== req.userId) {
      return res.status(400).json({ message: "not authorized" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error in verify car" });
  }
};
