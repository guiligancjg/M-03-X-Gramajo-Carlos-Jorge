import User from "../models/user.post.model.js";
import jwt from "jsonwebtoken";
import { settingTokenSecret } from "../views/config.js";
import { createAccessToken } from "../middlewares/jwt.validation.js";
//import { verificarToken }  from "../middlewares/jwt.validation.js"

// Metodos de SIGNUP (Registro de usuario) y SIGNIN (Inicio de Sesión)

export const signup = async (req, res) => {
  try {
    const { username, email, password, avatarURL } = req.body;

    const userFound = await User.findOne({ email });
    if (userFound)
      return res
        .status(400)
        .json(["El Usuario ya existe!!!, ya hay un e-mail registrado."]);

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
      avatarURL,
    });

    const uservalidate = await newUser.save();

    const token = await createAccessToken({ id: uservalidate._id });
    res.cookie("token", token);
    res.json({ success: true });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Error al crear el Registro!!!" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json(["Usuario no esta registrado"]);
    const verifiedPassword = await User.comparePassword(
      password,
      user.password
    );

    if (!verifiedPassword) {
      return res.status(404).json(["Password incorrecto..."]);
    } else {
      const token = await createAccessToken({ id: user._id });
      res.cookie("token", token);
      res.json({ success: true });
    }

    /* res.status(200).json({
        message: "Usuario ingreso con exito!!!",
        token,
      });*/
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Error en el inicio de sesion..." });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date(0) });
    return res.status(200).json(["Hasta pronto!!!"]);
  } catch (error) {
    res.status(400).json(["Error al cerrar la sesión..."]);
  }
};

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
      return res.status(404).json(["Usuario no encontrado."]);
    }

    // Devolver la información del usuario
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(["Error al obtener la información del usuario."]);
  }
};

// Actualizar el perfil del usuario autenticado
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const fieldsToUpdate = [
      { name: 'avatarURL', value: req.query.avatarURL },
      { name: 'username', value: req.body.username },
      { name: 'email', value: req.body.email },
      { name: 'password', value: req.body.password, encrypt: true },
    ];

    console.log(req.query.avatarURL)
    for (const field of fieldsToUpdate) {
      const { name, value, encrypt } = field;

      if (value !== undefined && value.trim()) {
        const updatedUserData = { [name]: encrypt ? await User.encryptPassword(value) : value };

        const updatedUser = await User.findByIdAndUpdate(
          userId,
          updatedUserData,
          { new: true, omitUndefined: true }
        );

        if (!updatedUser) {
          return res.status(404).json([`Usuario no encontrado al actualizar ${name}.`]);
        }
      } else {
        console.log(`${name} no está presente o es undefined`);
      }
    }

    res.status(200).json(["Los datos están actualizados."]);
  } catch (error) {
    res.status(500).json(["Error al actualizar el perfil del usuario."]);
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
      return res.status(404).json(["Usuario no encontrado."]);
    }

    // Devolver un mensaje de éxito
    res.status(200).json(["Cuenta eliminada exitosamente!!!."]);
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la cuenta del usuario.",
      error: error.message,
    });
  }
};


const { secret } = settingTokenSecret();

export const validarToken = async (req, res) => {
  try {
    const { token } = req.cookies;
    //const token = req.headers["authorization"];
    //const token = req.headers.authorization;
    //console.log("Esto es token en el Backend en el archivo auth.post",token)
    //console.log("Este es el secreto",secret)

    if (!token) {
      return res.status(403).json(["No existe el Token..."]);
    }

    jwt.verify(token, secret, async (err, user) => {
      if (err) return res.status(401).json(["El Token no esta autorizado..."]);
      const userFound = await User.findById(user.id);
      if (!userFound)
        return res.status(401).json(["Usuario no autorizado Token no esta"]);

      /*  return res.json({
        username: userFound.username,
        avatarURL: userFound.avatarURL
    });*/
      const { _id, username, avatarURL, email } = userFound;
      return res.json([_id, username, avatarURL, email]);
    });
  } catch (error) {
    return res.status(404).json(["error en veifyToken en el servidor"]);
  }
};


