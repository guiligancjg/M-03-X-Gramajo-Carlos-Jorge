import jwt from "jsonwebtoken";
import  {settingTokenSecret} from "../views/config.js";



export const verificarToken = async (req, res, next) => {
  try {
    //const token = req.headers["authorization"];
    const { token } = req.cookies;
    //const token = req.headers.authorization;
    //console.log("Esto es token en el Backend en el archivo auth.post",token)

    if (!token) {
      return res.status(403).json(["No existe el Token..."]);
    }

    jwt.verify(token, settingTokenSecret().secret, (error, usuario) => {
      if (error) {
        return res.status(403).json(["El Token no esta autorizado..."]);
      }

      req.user = usuario; //con next paso esta variable a createPost en posteos.controller.js
      next();
    });
  } catch (error) {
    return res.status(404).json(["error en veifyToken en el servidor"]);
  }
};


