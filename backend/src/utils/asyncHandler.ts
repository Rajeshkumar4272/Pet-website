import { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * Wraps async route handlers and passes errors to Express error middleware.
 * @param fn - An async Express route handler.
 */

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
