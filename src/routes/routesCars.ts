import { Router } from "express";
import {
  createCar,
  deleteCar,
  detailCar,
  listCars,
  updateCar,
} from "../controllers/cars";
import { verifyCar } from "../middlewares/verifyCar";
import { validateBody } from "../middlewares/validateBody";
import { newCar } from "../config/schema";
const routesCars = Router();

routesCars.get("/cars", listCars);
routesCars.get("/car/:id", verifyCar, detailCar);

routesCars.post("/cars", validateBody(newCar), createCar);
routesCars.post("/cars/:id", verifyCar, validateBody(newCar), updateCar);

routesCars.delete("/cars/:id", verifyCar, deleteCar);

export default routesCars;
