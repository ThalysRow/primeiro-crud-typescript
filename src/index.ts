import "dotenv/config";
import express from "express";
import routesUser from "./routes/routesUsers";
import { authentication } from "./middlewares/authentication";
import routesCars from "./routes/routesCars";

const app = express();

app.use(express.json());

app.use(routesUser);

app.use(authentication);

app.use(routesCars);

app.listen(process.env.PORT, () => {
  console.log("Servidor iniciado na porta 3000");
});
