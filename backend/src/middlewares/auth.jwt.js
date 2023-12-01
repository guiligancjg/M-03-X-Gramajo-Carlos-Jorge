import jwt from "jsonwebtoken";
import { settingTokenSecret } from "../views/config.js";

export const verificarToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(403).json({ mensaje: "Token no proporcionado" });
    }

    jwt.verify(token, settingTokenSecret().secret, (error, usuario) => {
      if (error) {
        return res.status(403).json({ mensaje: "Token no válido" });
      }

      req.user = usuario; //con next paso esta variable a createPost en posteos.controller.js
      next();
    });
  } catch (error) {
    return res.status(404).json({ mensaje: "Error en el Token..." });
  }
};

/*
try {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ mensaje: 'Token no proporcionado' });
      }else {
        const decoded = jwt.verify(token, settingTokenSecret().secret);
        
        console.log(decoded);
      }

      req.user = usuario;
      next();
} catch (error) {
    return res.status(404).json({ mensaje: 'Error en el Token...' });
}


*/
