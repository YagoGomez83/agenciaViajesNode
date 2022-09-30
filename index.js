// const express = require("express");
import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

const app = express();

//conectar a la base de datos

db.authenticate()
  .then(() => {
    console.log("base de datos conectada");
  })
  .catch((error) => console.log(error));

//Definimos el puerto
const port = process.env.PORT || 4000;

//Habilitar pug

app.set("view engine", "pug");

// Obtener el año actual

app.use((req, res, next) => {
  const year = new Date();
  res.locals.Actualyear = year.getFullYear();
  console.log(res.locals);
  res.locals.nombreSitio = "Agencia de Viajes";
  return next();
});

// Agregar body parser para leer los datos del formulario

app.use(express.urlencoded({ extended: true }));

//Definir la carpeta publica
app.use(express.static("public"));
//agregar router

app.use("/", router);

app.listen(port, () => {
  console.log(`El Servidor esta funcionando en el puerto ${port}`);
});
