import { Router } from "express";
import productsRouter from "./productsRouter.js";
import userRouter from "./userRouter.js";
import slidesRouter from "./slidesRouter.js";
import worksRouter from "./worksRouter.js";
import requestRouter from "./requestRouter.js";

const PrimaryRouter = new Router();

PrimaryRouter.use("/user", userRouter);
PrimaryRouter.use("/request", requestRouter);
PrimaryRouter.use("/card", productsRouter);
PrimaryRouter.use("/slides", slidesRouter);
PrimaryRouter.use("/works", worksRouter);

export default PrimaryRouter;
