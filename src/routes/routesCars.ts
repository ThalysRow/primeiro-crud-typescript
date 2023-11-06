import { Router } from "express";
import {
  createCar,
  deleteCar,
  detailCar,
  listCars,
  updateCar,
} from "../controllers/cars";
const routesCars = Router();

routesCars.get("/cars", listCars);
routesCars.get("/car/:id", detailCar);

routesCars.post("/cars", createCar);
routesCars.post("/cars/:id", updateCar);

routesCars.delete("/cars/:id", deleteCar);

export default routesCars;
