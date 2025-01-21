/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

/**
 * Middleware function to handle 404 errors (Not Found).
 * This middleware is triggered when no other route matches the request.
 * It sends a standardized error response for an undefined API endpoint.
 *
 * @param req - The incoming request object.
 * @param res - The response object used to send the error response.
 * @param next - The next middleware function in the chain (not used here, but included for compatibility).
 *
 * @returns A JSON response with a 404 status code indicating that the requested API was not found.
 */
const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false, // Indicating the request was unsuccessful
    message: 'API NOT FOUND!', // Default message for when no matching route is found
    statusCode: httpStatus.NOT_FOUND, // HTTP status code for "Not Found"
    error: '', // Empty error field as there's no specific error details here
  });
};

export default notFound;
