/* eslint-disable @typescript-eslint/no-explicit-any */
import { TError, TGenericErrorResponse } from '../interface/error';

/**
 * Handles MongoDB duplicate key errors and formats them into a standardized error response.
 * This is commonly used to handle unique constraint violations, such as duplicate emails.
 *
 * @param err - The error object from MongoDB containing details about the duplicate key.
 * @returns A standardized error response with an HTTP status code, error message, and details.
 */
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Attempt to extract the duplicate key value (e.g., email) from the error message using regex
  const email = err.message.match(/"([^"]+)"/)?.[1];

  // Construct an array of errors with details about the field and the specific error message
  const error: TError = [
    {
      path: '', // Field name can be left empty or extracted explicitly based on error details
      message: `${email} is already exists!`, // Provide a user-friendly error message
    },
  ];

  // HTTP status code for validation errors
  const statusCode = 400;

  // Return a structured error response
  return {
    statusCode,
    message: 'Validation error', // Generalized message for validation issues
    error, // Array containing detailed error information
  };
};

export default handleDuplicateError;
