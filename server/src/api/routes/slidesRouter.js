import { Router } from "express";
const slidesRouter = new Router();
import checkRoleMiddleWare from "../../middleware/checkRoleMiddleWare.js";
import slidesController from "../controllers/slidesController.js";

slidesRouter.post(
  "/examples",
  checkRoleMiddleWare("ADMIN"),
  slidesController.createExamples,
);
slidesRouter.post("/", checkRoleMiddleWare("ADMIN"), slidesController.create);

slidesRouter.get("/", slidesController.getAll);
slidesRouter.get("/:id", slidesController.getOne);

slidesRouter.delete(
  "/",
  checkRoleMiddleWare("ADMIN"),
  slidesController.deleteAll,
);

export default slidesRouter;
