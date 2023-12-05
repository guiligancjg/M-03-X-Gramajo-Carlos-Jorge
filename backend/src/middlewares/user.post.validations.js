import { body, validationResult } from "express-validator";
export const validateRegister = [
  body("username")
    .notEmpty()
    .withMessage("Ingrese el nombre del Usuario...")
    .isLength({ min: 6 })
    .withMessage("El Usuario debe tener al menos 6 caractéres"),

  body("email").isEmail().withMessage("Por favor ingrese un e-mail válido"),

  body("password")
    .notEmpty()
    .withMessage("El Password es obligatorio")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Por favor ingrese un e-mail válido"),

  body("password")
    .notEmpty()
    .withMessage("El Password es obligatorio")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
    
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


