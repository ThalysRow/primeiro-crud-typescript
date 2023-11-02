import { Request, Response } from "express";
import { knex } from "../database/conextion";
import { Car } from "../types/tyes";

export const listCars = async (_: Request, res: Response) => {
  try {
    const result = await knex<Car>("cars");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error in list cars." });
  }
};

export const detailCar = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const car = await knex<Car>("cars").where("id", id).first();
    return res.status(200).json(car);
  } catch (error) {
    return res.status(500).json({ message: "Error in detail car." });
  }
};

export const updateCar = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { brand, model, yearcar, collor, price } = req.body;
  try {
    await knex<Car>("cars")
      .update({ brand, model, yearcar, collor, price })
      .where("id", id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Error in update car." });
  }
};

export const deleteCar = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await knex<Car>("cars").where("id", id).del();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Error in delete car." });
  }
};

export const createCar = async (req: Request, res: Response) => {
  const { brand, model, yearcar, collor, price } = req.body;
  try {
    await knex<Omit<Car, "id">>("cars").insert({
      brand,
      model,
      yearcar,
      collor,
      price,
    });
    return res.status(201).json({ message: "create sucessfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error in create car." });
  }
};
