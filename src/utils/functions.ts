import { knex } from "../database/conextion";
import { User } from "../types/types";

export const findUser = async (email: string): Promise<User | undefined> => {
  const user = await knex("users").where("email", email).first();
  return user;
};
