import express, { Application } from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";
import apiRoutes from "./routes";
import cors from "cors";

export const createApp = (): Application => {
  const app = express();

  // Third-party middleware
  app.use(cors());
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static("public"));

  // API Routes
  app.use("/api/v1", apiRoutes);

  // Custom error handler
  app.use(errorHandler);

  return app;
};
