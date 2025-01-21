import { NextFunction, Request, RequestHandler, Response } from 'express'; // Importing types for Express middleware and handlers

/**
 * Utility function to handle asynchronous route handlers.
 * This function wraps an asynchronous Express route handler and ensures
 * that any errors are caught and passed to the next middleware (error handler).
 *
 * @param fn - The asynchronous route handler function
 * @returns A wrapped route handler function that catches errors
 */
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Resolves the promise returned by the route handler
    // and catches any errors to pass them to the next middleware
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};

export default catchAsync; // Exporting the utility for use in other parts of the application
