import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorResponse } from '../interface/error';

/**
 * Handles Zod validation errors and formats them into a standardized error response.
 * This function processes errors thrown by Zod schemas when validation rules are violated.
 *
 * @param err - The validation error object provided by Zod.
 * @returns A structured error response containing an HTTP status code, message, and detailed error information.
 */
const handleZodError = (err: ZodError): TGenericErrorResponse => {
  // Extract the first validation error
  const error: ZodIssue | undefined = err.issues[0];

  // Set the HTTP status code for validation errors
  const statusCode = 400;

  // Return a structured error response
  return {
    statusCode,
    message: 'Validation error', // Generalized message for validation issues
    error: {
      details: error ? `${error.message}` : 'Validation error occurred',
    },
  };
};

export default handleZodError;
