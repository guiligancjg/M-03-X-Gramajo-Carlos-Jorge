import jwt from "jsonwebtoken";
import { settingTokenSecret } from "../views/config.js";



export const createAccessToken = (payload) => {
  //generamos una promesa para utilizar el await al invocar esta funcion
  return new Promise((resolve, reject) => {
    jwt.sign(payload, settingTokenSecret().secret, { expiresIn: "10h" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};
