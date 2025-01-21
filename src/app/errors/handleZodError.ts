import { ZodError, ZodIssue } from 'zod';
import { TError } from '../interface/error';

/**
 * Handles Zod validation errors and formats them into a standardized error response.
 * This function processes errors thrown by Zod schemas when validation rules are violated.
 *
 * @param err - The validation error object provided by Zod.
 * @returns A structured error response containing an HTTP status code, message, and detailed error information.
 */
const handleZodError = (err: ZodError) => {
  // Transform Zod issues into a detailed error array
  const error: TError = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1], // Extract the last part of the path causing the error
      message: issue.message, // The validation error message
    };
  });

  // Set the HTTP status code for validation errors
  const statusCode = 400;

  // Return a structured error response
  return {
    statusCode,
    message: 'Validation error', // Generalized message for validation issues
    error, // Array containing detailed error information
  };
};

export default handleZodError;
