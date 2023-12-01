import User from "../models/user.post.model.js";
import jwt from "jsonwebtoken";
import { settingTokenSecret } from "../views/config.js";
import { createAccessToken } from "../middlewares/jwt.validation.js";

// Metodos de SIGNUP (Registro de usuario) y SIGNIN (Inicio de Sesión)

export const signup = async (req, res) => {
  try {
    const { username, email, password, avatarURL } = req.body;


    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
      avatarURL,
    });

    const uservalidate = await newUser.save();


    const token = await createAccessToken({ id: uservalidate._id });
    res.cookie("token", token);    
    res.status(200).json(["Usuario creado con éxito"]);

/*
 res.status(200).json({
      message: "Usuario creado con éxito",
      id: uservalidate.id,
      username: uservalidate.username,
      email: uservalidate.email,
      token,
    });
*/
    
    
  } catch (error) {
    res.status(404).json(["Ingresa otro correo electonico, ya existe el Usuario..."]);
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json(["Usuario no esta registrado"]);
    const verifiedPassword = await User.comparePassword(
      password,
      user.password
    );

    if (!verifiedPassword) {
      return res
        .status(404)
        .json(["Password incorrecto..."]);
    } else {
      const token = await createAccessToken({ id: user._id });
      res.cookie("token", token);    
      res.status(200).json(["Usuario ingreso con exito!!!"])
    };
     
     /* res.status(200).json({
        message: "Usuario ingreso con exito!!!",
        token,
      });*/
    
  } catch (error) {
    res.status(400).json(["Error en el inicio de sesion..."]);
  }
};



export const logout = async (req, res) => {
  try {
    res.cookie("token","",{expires: new Date(0)});
    return res.status(200).json(["Hasta pronto!!!"]);
  } catch (error) {
    res.status(400).json(["Error al cerrar la sesión..."]);
  }

}



//Token para usuarios






// Obtener información del usuario autenticado
export const getUserProfile = async (req, res) => {
  try {
    // Obtener el ID del usuario autenticado desde el token
    const userId = req.user.id;

    // Buscar al usuario en la base de datos por su ID
    const user = await User.findById(userId);

    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Devolver la información del usuario
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener la información del usuario.",
        error: error.message,
      });
  }
};

// Actualizar el perfil del usuario autenticado
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email, password, avatarURL } = req.body;

    // Verifica si se proporciona una nueva contraseña antes de cifrarla
    const updatedUserData = {
        username,
        email,
        avatarURL,
      };
  
      if (password) {
        updatedUserData.password = await User.encryptPassword(password);
      }

    
    //const updatedUserData = req.body;

    // Actualizar el perfil del usuario en la base de datos
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
      omitUndefined: true,
    });

    // Verificar si el usuario existe
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Devolver la información actualizada del usuario
    res.status(200).json({ message: "El perfil fue Actualizado"});
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar el perfil del usuario.",
        error: error.message,
      });
  }
};

// Eliminar la cuenta del usuario autenticado
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    // Eliminar al usuario de la base de datos
    const deletedUser = await User.findByIdAndDelete(userId);

    // Verificar si el usuario existe
    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Devolver un mensaje de éxito
    res.status(200).json({ message: "Cuenta eliminada exitosamente!!!." });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al eliminar la cuenta del usuario.",
        error: error.message,
      });
  }
};
