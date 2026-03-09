import { Router } from "express";
const worksRouter = new Router();
import worksController from "../controllers/worksController.js";
import checkRoleMiddleWare from "../../middleware/checkRoleMiddleWare.js";

worksRouter.post("/examples", worksController.createExamples);
worksRouter.post("/", checkRoleMiddleWare("ADMIN"), worksController.create);

worksRouter.get("/", worksController.getSmart);
worksRouter.get("/:id", worksController.getOne);

worksRouter.delete(
  "/",
  checkRoleMiddleWare("ADMIN"),
  worksController.deleteAll,
);
// worksRouter.delete("/", worksController.deleteAll);
worksRouter.delete(
  "/:id",
  checkRoleMiddleWare("ADMIN"),
  worksController.deleteOne,
);

export default worksRouter;
