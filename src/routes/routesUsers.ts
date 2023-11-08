import { Router } from "express";
import { validateBody } from "../middlewares/validateBody";
import { newUser } from "../config/schema";
import {
  createUser,
  deleteUser,
  loginUser,
  updateUser,
} from "../controllers/users";
import { findEmail } from "../middlewares/findEmail";
import { validateLogin } from "../middlewares/validateLogin";
import { authentication } from "../middlewares/authentication";
import { findUserId } from "../middlewares/findUserId";
const routesUser = Router();

routesUser.post("/user", validateBody(newUser), findEmail, createUser);
routesUser.post("/login", validateLogin, loginUser);

routesUser.use(authentication);

routesUser.put("/user/:id", validateBody(newUser), findEmail, updateUser);

routesUser.delete("/user/:id", findUserId, deleteUser);

export default routesUser;
