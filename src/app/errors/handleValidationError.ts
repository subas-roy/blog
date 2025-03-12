import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

/**
 * Handles MongoDB validation errors and formats them into a standardized error response.
 * This is used to process errors thrown when mongoose validation rules are violated.
 *
 * @param err - The validation error object provided by mongoose.
 * @returns A standardized error response with an HTTP status code, error message, and details.
 */
const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  // Extract the first validation error
  const error = Object.values(err.errors)[0];

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

export default handleValidationError;
