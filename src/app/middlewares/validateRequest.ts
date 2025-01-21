import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

/**
 * Middleware to validate incoming requests using Zod schemas.
 * This middleware ensures that the request body and cookies match the specified schema.
 * If validation fails, an error will be thrown and handled by the global error handler.
 *
 * @param schema - A Zod schema object that defines the structure and validation rules for the request.
 *
 * @returns A middleware function that validates the request and passes control to the next middleware.
 */
const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Parse and validate the request body and cookies using the provided Zod schema
    await schema.parseAsync({
      body: req.body, // Validate the body of the request
      cookies: req.cookies, // Validate the cookies in the request
    });

    // If validation passes, proceed to the next middleware or route handler
    next();
  });
};

export default validateRequest;
