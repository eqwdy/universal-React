import { body, validationResult } from "express-validator";

const ChangeRequestStatusValidation = [
  body("status")
    .notEmpty()
    .withMessage("Missing request status")
    .isIn(["approved", "rejected"])
    .withMessage("Status must be either 'approved' or 'rejected'"),

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

export default ChangeRequestStatusValidation;
