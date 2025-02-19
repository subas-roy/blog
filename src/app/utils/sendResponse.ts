import { Response } from 'express'; // Importing the Response type from Express

// Define a generic type for the response structure
type TResponse<T> = {
  statusCode: number; // HTTP status code
  success: boolean; // Indicates whether the operation was successful
  message?: string; // Optional message providing additional context
  data: T; // Generic type for the data being returned in the response
};

/**
 * Utility function to send a structured response.
 * This function ensures a consistent response format across the application.
 *
 * @param res - Express Response object to send the response
 * @param data - Object containing the statusCode, success, message, and data to be sent
 */
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success, // Indicates operation success
    message: data.message, // Optional message for the response
    statusCode: data.statusCode, // HTTP status code for the response
    data: data.data, // Data payload being returned
  });
};

export default sendResponse; // Exporting the utility for use in other parts of the application
