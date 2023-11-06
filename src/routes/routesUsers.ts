import { Router } from "express";
import { validateBody } from "../middlewares/validateBody";
import { newUser } from "../config/schema";
import { createUser, loginUser } from "../controllers/users";
import { findEmail } from "../middlewares/findEmail";
const routesUser = Router();

routesUser.post("/user", validateBody(newUser), findEmail, createUser);
routesUser.post("/login", loginUser);

export default routesUser;
