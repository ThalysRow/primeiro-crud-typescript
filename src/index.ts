import express from "express";

require("dotenv").config();

const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log("Servidor iniciado na porta 3000");
});
