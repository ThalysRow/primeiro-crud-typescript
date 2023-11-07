import { Router } from "express";
import { validateBody } from "../middlewares/validateBody";
import { newUser } from "../config/schema";
import { createUser, loginUser } from "../controllers/users";
import { findEmail } from "../middlewares/findEmail";
import { validateLogin } from "../middlewares/validateLogin";
const routesUser = Router();

routesUser.post("/user", validateBody(newUser), findEmail, createUser);
routesUser.post("/login", validateLogin, loginUser);

export default routesUser;
