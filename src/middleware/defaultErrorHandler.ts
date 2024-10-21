import { Request, Response, NextFunction } from "express";

function defaultErrorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const code = error.statusCode || 500;

  if (typeof error.handle === "function") {
    error.handle(req, res, next);
    return;
  }

  if (code === 500) {
    console.error(`Error occurred at ${req.path}:`, error);
  }

  res.status(code).json({
    code,
    message: code !== 500 ? error.message : "Something went wrong!",
  });
}

export default defaultErrorHandler;
