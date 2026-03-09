import { body } from "express-validator";

const AddProductValidate = [
  body("title").notEmpty().withMessage("Missing title"),
  body("price").notEmpty().withMessage("Missing price"),
  body("description").notEmpty().withMessage("Missing description"),
  body().custom((value, { req }) => {
    if (!req.files || !req.files.img || req.files.img.length === 0) {
      throw new Error("Missing image");
    }
    return true;
  }),

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

export default AddProductValidate;
