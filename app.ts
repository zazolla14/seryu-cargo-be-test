import express from "express";
import logger from "morgan";
import defaultErrorHandler from "./src/middleware/defaultErrorHandler.js";
import driverRouter from "./routes/driver.js";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", driverRouter);

app.use(defaultErrorHandler);

export default app;
