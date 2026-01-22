import { ApiError } from "../utils/apiError.js";
import { ZodError } from "zod"

export const errorHandler = (err, req, res, next) => {
  let error = err;

  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));

    error = new ApiError(400, "Validation error", formattedErrors);
  }

  if (!(error instanceof ApiError)) {
    let statusCode = error.statusCode || 500;
    let message = error.message || "Something went wrong";

    if (error.name === "CastError" && error.kind === "ObjectId") {
      statusCode = 404;
      message = "Resource not found";
    }

    if (error.code === 11000) {
      statusCode = 400;
      const duplicatedField = Object.keys(error.keyValue)[0];
      message = `Duplicate field value entered for ${duplicatedField}. Please use another value.`;
    }

    if (error.name === "ValidationError") {
      statusCode = 400;
      const validationErrors = Object.values(error.errors).map(
        (val) => val.message
      );
      message = `Validation failed: ${validationErrors.join(", ")}`;
      error = new ApiError(statusCode, message, validationErrors);
    } else {
      error = new ApiError(statusCode, message);
    }
  }


  const finalStatusCode = Number.isInteger(error.statusCode)
    ? error.statusCode
    : 500;

  return res.status(finalStatusCode).json({
    success: error.success ?? false,
    message: error.message || "Something went wrong",
    errors: error.errors || [],
    stack: process.env.NODE_ENV === "development" ? error.stack : null,
  });
};
