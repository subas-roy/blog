/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod'; // Importing Zod for validation errors
import config from '../config'; // Import configuration settings, including environment variables
import { TError } from '../interface/error'; // Type definition for error response structure
import handleZodError from '../errors/handleZodError'; // Function to handle Zod validation errors
import handleValidationError from '../errors/handleValidationError'; // Function to handle general validation errors
import handleCastError from '../errors/handleCastError'; // Function to handle type casting errors (e.g., ObjectId)
import handleDuplicateError from '../errors/handleDuplicateError'; // Function to handle duplicate key errors (e.g., database constraint violations)
import AppError from '../errors/AppError'; // Custom error class used in the app

/**
 * Global error handling middleware for Express applications.
 * This middleware catches and handles all types of errors that occur during request processing.
 * It returns a standardized error response based on the type of error.
 *
 * @param err - The error object, which could be any type of error.
 * @param req - The incoming request object.
 * @param res - The response object used to send the error response.
 * @param next - The next middleware function in the chain (not used here, but included for compatibility).
 */
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Initialize default error values
  let statusCode = 500; // Default to internal server error
  let message = 'Something went wrong!'; // Default error message
  let error: TError = [
    {
      path: '', // No specific path, as it's a general error
      message: 'Something went wrong!', // Default message
    },
  ];

  // Check for different types of errors and handle accordingly

  // If the error is an instance of ZodError (Zod validation errors)
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err); // Handle and format the Zod error
    statusCode = simplifiedError?.statusCode || statusCode;
    message = simplifiedError?.message || message;
    error = simplifiedError?.error || error;
  }
  // If the error is a Mongoose ValidationError (General validation errors)
  else if (err.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err); // Handle and format validation errors
    statusCode = simplifiedError?.statusCode || statusCode;
    message = simplifiedError?.message || message;
    error = simplifiedError?.error || error;
  }
  // If the error is a Mongoose CastError (Type casting errors)
  else if (err.name === 'CastError') {
    const simplifiedError = handleCastError(err); // Handle and format cast errors (e.g., invalid ObjectId)
    statusCode = simplifiedError?.statusCode || statusCode;
    message = simplifiedError?.message || message;
    error = simplifiedError?.error || error;
  }
  // If the error is a MongoDB duplicate key error (e.g., unique constraint violation)
  else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err); // Handle and format duplicate errors
    statusCode = simplifiedError?.statusCode || statusCode;
    message = simplifiedError?.message || message;
    error = simplifiedError?.error || error;
  }
  // If the error is an instance of AppError (Custom application-specific errors)
  else if (err instanceof AppError) {
    statusCode = err?.statusCode || statusCode;
    message = err?.message || message;
    error = [
      {
        path: '', // No specific path for AppError
        message: err.message, // Use the message from AppError
      },
    ];
  }
  // If the error is a general Error instance (catch-all for other errors)
  else if (err instanceof Error) {
    message = err?.message || message;
    error = [
      {
        path: '', // No specific path for general errors
        message: err.message, // Use the error message
      },
    ];
  }

  // Return the error response to the client
  return res.status(statusCode).json({
    success: false, // Indicate that the request failed
    message, // Error message
    statusCode, // HTTP status code
    error, // Detailed error information
    stack: config.NODE_ENV === 'development' ? err?.stack : null, // Include stack trace in development mode for debugging
    // err, // Optionally include the full error object for debugging (disabled here)
  });
};

export default globalErrorHandler;

// Error pattern
/*
  success
  message
  statusCode
  error
  stack
 */
