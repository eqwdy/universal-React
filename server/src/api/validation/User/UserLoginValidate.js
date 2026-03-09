import { body, validationResult } from "express-validator";

const UserLoginValidate = [
  body("tel")
    .notEmpty()
    .withMessage("Missing tel")
    .isLength({ min: 11 })
    .withMessage("Uncorrect tel"),

  body("password")
    .notEmpty()
    .withMessage("Missing password")
    .isLength({ min: 4 })
    .withMessage("Uncorrect password"),

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

export default UserLoginValidate;
