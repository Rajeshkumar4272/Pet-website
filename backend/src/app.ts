import express, { Application } from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";

export const createApp = (): Application => {
  const app = express();

  // Third-party middleware
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  // API Routes
  app.use("/api/v1", apiRoutes);

  // Custom error handler
  app.use(errorHandler);

  return app;
};
