import { Router } from "express";
const productsRouter = new Router();
import checkRoleMiddleWare from "../../middleware/checkRoleMiddleWare.js";
import productsController from "../controllers/productsController.js";
import AddProductValidate from "../validation/Products/AddProductValidate.js";

productsRouter.get("/", productsController.getAll);
productsRouter.get("/:id", productsController.getOne);

productsRouter.post(
  "/",
  checkRoleMiddleWare("ADMIN"),
  AddProductValidate,
  productsController.create,
);
productsRouter.post(
  "/examples",
  checkRoleMiddleWare("ADMIN"),
  productsController.createExamples,
);

productsRouter.patch(
  "/:id",
  checkRoleMiddleWare("ADMIN"),
  productsController.update,
);

productsRouter.delete(
  "/",
  checkRoleMiddleWare("ADMIN"),
  productsController.deleteAll,
);
productsRouter.delete(
  "/:id",
  checkRoleMiddleWare("ADMIN"),
  productsController.deleteOne,
);

export default productsRouter;
