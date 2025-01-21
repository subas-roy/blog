import mongoose from 'mongoose';
import { TError, TGenericErrorResponse } from '../interface/error';

/**
 * Handles Mongoose `CastError` and formats it into a generic error response.
 * A `CastError` occurs when a value cannot be cast to the expected type, such as an invalid ObjectId.
 *
 * @param err - The Mongoose `CastError` object.
 * @returns A standardized error response with an HTTP status code, error message, and details.
 */
const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  // Construct an array of errors with details about the field and message
  const error: TError = [
    {
      path: err.path, // The field where the casting failed
      message: err.message, // The error message provided by Mongoose
    },
  ];

  // HTTP status code for validation errors
  const statusCode = 400;

  // Return a generic error response in a structured format
  return {
    statusCode,
    message: 'Validation error', // Generalized message for validation issues
    error, // Array containing detailed error information
  };
};

export default handleCastError;
