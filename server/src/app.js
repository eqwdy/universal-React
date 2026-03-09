import express from "express";
import { configDotenv } from "dotenv";
import sequelize from "./db/db.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";
import { staticPath } from "./conf.js";
import cookieParser from "cookie-parser";
import PrimaryRouter from "./api/routes/app.js";
configDotenv();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(
  cors({
    origin: `${process.env.FRONT_URL}`,
    credentials: true,
  }),
);
app.use(express.static(staticPath));
app.use("/api", express.json(), fileUpload({}), PrimaryRouter);

// Errors middleware
app.use(errorHandler);

app.get("/health", (req, res) => {
  res.sendStatus(200);
});

async function startDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

startDB();

export default app;
