import { knex } from "../database/conextion";
import { Car, User } from "../types/types";

export const findUser = async (email: string): Promise<User | undefined> => {
  const user = await knex<User>("users").where("email", email).first();
  return user;
};

export const formateData = (data: string): string => {
  const noSpaceSides = data.trim();
  const array = noSpaceSides.split(" ");

  const formatade = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i] && array[i] !== " ") {
      formatade.push(
        (array[i] = array[i][0].toUpperCase() + array[i].slice(1).toLowerCase())
      );
    }
  }
  const result = formatade.join(" ");
  return result;
};

export const findCar = async (id: number): Promise<Car | undefined> => {
  const car = await knex<Car>("cars").where("id", id).first();
  return car;
};
