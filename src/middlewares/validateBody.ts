import { NextFunction, Request, Response } from "express";
import { SchemaNewUser } from "../types/types";

export const validateBody =
  (schema: SchemaNewUser) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      if (
        error !== null &&
        typeof error === "object" &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        return res.status(400).json({ message: error.message });
      }
    }
  };
