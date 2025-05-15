import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log the error
  if (err.isOperational) {
    logger.error(`[Operational Error] ${message}`);
  } else {
    logger.error(`[Unexpected Error] ${err.stack || message}`);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
