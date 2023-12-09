import jwt from "jsonwebtoken";
import { settingTokenSecret } from "../views/config.js";

const { secret } = settingTokenSecret();

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: "10h" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

