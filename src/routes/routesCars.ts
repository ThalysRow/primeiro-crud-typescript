import { Router } from "express";
import {
  createCar,
  deleteCar,
  detailCar,
  listCars,
  updateCar,
} from "../controllers/cars";
import { verifyCar } from "../middlewares/verifyCar";
const routesCars = Router();

routesCars.get("/cars", listCars);
routesCars.get("/car/:id", verifyCar, detailCar);

routesCars.post("/cars", createCar);
routesCars.post("/cars/:id", updateCar);

routesCars.delete("/cars/:id", deleteCar);

export default routesCars;
