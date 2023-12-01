import mongoose from "mongoose";
import { settingDotEnv } from "../views/config.js"


const {db} = settingDotEnv();

mongoose
  .connect(db.host)
  .then((db) => console.log("Base de Datos Conectada..."))
  .catch((err) => console.log("Error al conectarse de MongoAtlas"));
