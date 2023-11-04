import { Router } from "express";
import {
  createCar,
  deleteCar,
  detailCar,
  listCars,
  updateCar,
} from "./controllers/cars";
import { createUser, loginUser } from "./controllers/users";
import { authentication } from "./middlewares/authentication";

const routes = Router();

routes.post("/user", createUser);
routes.post("/login", loginUser);

routes.use(authentication);

routes.get("/cars", listCars);
routes.get("/car/:id", detailCar);

routes.post("/car/:id", updateCar);
routes.post("/car", createCar);

routes.delete("/car/:id", deleteCar);

export default routes;
