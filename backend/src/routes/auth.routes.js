import { Router } from "express";
import { signup, signin, logout, getUserProfile, updateProfile, deleteAccount } from "../controllers/auth.post.controller.js"
import { manejarErroresValidacion, validateLogin, validateRegister } from "../middlewares/user.post.validations.js"
import { verificarToken }  from "../middlewares/auth.jwt.js"


export const authRouter = Router();


//Rutas públicas
//SIGNUP 
authRouter.post("/signup", validateRegister, manejarErroresValidacion, signup);

//SIGNIN
authRouter.post("/signin", validateLogin, manejarErroresValidacion, signin);

//LOGOUT
authRouter.post("/logout", logout);

/********************************************************************************* */
//Rutas Privadas

authRouter.get("/profile", verificarToken, getUserProfile);

authRouter.put("/profile", verificarToken, updateProfile);

authRouter.delete("/profile/:userId", verificarToken, deleteAccount);

