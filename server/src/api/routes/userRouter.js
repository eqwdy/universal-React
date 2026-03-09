import { Router } from "express";
const userRouter = new Router();
import authMiddleWare from "../../middleware/authMiddleWare.js";
import checkRoleMiddleWare from "../../middleware/checkRoleMiddleWare.js";
import userController from "../controllers/userController.js";
import UserRegisterValidate from "../validation/User/UserRegisterValidate.js";
import UserLoginValidate from "../validation/User/UserLoginValidate.js";
import UserDeleteValidate from "../validation/User/UserDeleteValidate.js";

// CONTROL USERS
userRouter.post("/register", UserRegisterValidate, userController.registration);
userRouter.post("/login", UserLoginValidate, userController.login);

userRouter.get("/auth", authMiddleWare, userController.check);
userRouter.post("/logout", authMiddleWare, userController.logout);

userRouter.get("/", checkRoleMiddleWare("ADMIN"), userController.getAll);

userRouter.delete(
  "/:id",
  checkRoleMiddleWare("ADMIN"),
  UserDeleteValidate,
  userController.delete,
);

// CONTROL ADMINS
userRouter.post(
  "/register/primary-admin",
  userController.registrationExampleOwner,
); // !!!!

userRouter.post(
  "/register/admin",
  checkRoleMiddleWare("OWNER"),
  UserRegisterValidate,
  userController.registrationAdmin,
);

userRouter.post(
  "/register/user",
  checkRoleMiddleWare("ADMIN"),
  UserRegisterValidate,
  userController.registrationAdmin,
); // !!!!

userRouter.get(
  "/admin",
  checkRoleMiddleWare("OWNER"),
  userController.getAllAdmins,
);

userRouter.delete(
  "/admin/:id",
  checkRoleMiddleWare("OWNER"),
  UserDeleteValidate,
  userController.deleteAdmin,
);

export default userRouter;
