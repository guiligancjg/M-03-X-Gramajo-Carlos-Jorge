import { body, validationResult } from "express-validator";
export const validateRegister = [
  body("username")
    .notEmpty()
    .withMessage("Username no debe estar vacío")
    .isLength({ min: 6 })
    .withMessage("El Username debe tener al menos 6 caractéres"),

  body("email").isEmail().withMessage("Por favor ingrese un mail válido"),

  body("password")
    .notEmpty()
    .withMessage("El Password es obligatorio")
    .isLength({ min: 6 })
    .withMessage("Longitud mínima del password es de 6 caractéres"),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Por favor ingrese un mail válido"),

  body("password")
    .notEmpty()
    .withMessage("El Password es obligatorio")
    .isLength({ min: 6 })
    .withMessage("Longitud mínima del password es de 6 caractéres"),
    
];

export const manejarErroresValidacion = (req, res, next) => {
  const response = validationResult(req);
  if (!response.isEmpty()) {
    const errorMessage = response.array()[0].msg;
    const menssage = res.status(404).json([ errorMessage ])
    return menssage;
  }
  
  next();
};


