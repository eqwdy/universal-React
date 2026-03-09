import { param, validationResult } from "express-validator";

const UserDeleteValidate = [
  param("id").notEmpty().withMessage("Missing id"),

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

export default UserDeleteValidate;
