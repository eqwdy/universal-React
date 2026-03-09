import { body, validationResult } from "express-validator";

const CreateAnonRequestValidation = [
  body("name")
    .notEmpty()
    .withMessage("Missing name")
    .isLength({ min: 2 })
    .withMessage("Incorrect name"),
  body("tel")
    .notEmpty()
    .withMessage("Missing tel")
    .isLength({ min: 11 })
    .withMessage("Incorrect tel"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message: "Uncorrect data",
        errors: errors.array(),
      });
    }

    next();
  },
];

export default CreateAnonRequestValidation;
