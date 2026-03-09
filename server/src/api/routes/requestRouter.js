import { Router } from "express";
const requestRouter = new Router();
import authMiddleWare from "../../middleware/authMiddleWare.js";
import checkRoleMiddleWare from "../../middleware/checkRoleMiddleWare.js";
import UserRequestController from "../controllers/UserRequestController.js";
import AdminRequestController from "../controllers/AdminRequestController.js";
import DeleteRequestValidation from "../validation/Requests/User/DeleteRequestValidation.js";
import ChangeRequestStatusValidation from "../validation/Requests/Admin/ChangeRequestStatusValidation.js";
import AnonRequestController from "../controllers/AnonRequestController.js";
import CreateAnonRequestValidation from "../validation/Requests/Anon/CreateAnonRequestValidation.js";

requestRouter.post(
  "/anon",
  CreateAnonRequestValidation,
  AnonRequestController.createRequest,
);

requestRouter.get("/user", authMiddleWare, UserRequestController.getSmart);
requestRouter.get("/user/:id", authMiddleWare, UserRequestController.getOne);

requestRouter.post("/user", authMiddleWare, UserRequestController.addRequest);

requestRouter.delete(
  "/user/:id",
  authMiddleWare,
  DeleteRequestValidation,
  UserRequestController.deleteRequest,
);

requestRouter.patch(
  "/admin/:id",
  checkRoleMiddleWare("ADMIN"),
  ChangeRequestStatusValidation,
  AdminRequestController.changeRequestStatus,
);

requestRouter.get(
  "/admin",
  checkRoleMiddleWare("ADMIN"),
  AdminRequestController.getSmart,
);

export default requestRouter;
