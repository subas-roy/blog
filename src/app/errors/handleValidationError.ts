import mongoose from 'mongoose';
import { TError, TGenericErrorResponse } from '../interface/error';

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
  // Extract and transform the validation errors into a detailed error array
  const error: TError = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.path, // The path (field name) that caused the validation error
        message: val.message, // The error message explaining what went wrong
      };
    },
  );

  // Set the HTTP status code for validation errors
  const statusCode = 400;

  // Return a structured error response
  return {
    statusCode,
    message: 'Validation error', // Generalized message for validation issues
    error, // Array containing detailed error information
  };
};

export default handleValidationError;
