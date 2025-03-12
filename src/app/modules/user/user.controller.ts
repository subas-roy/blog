// Handles application Request and Response
import { userServices } from './user.service'; // Importing service functions for user operations
import sendResponse from '../../utils/sendResponse'; // Utility for sending consistent API responses
import httpStatus from 'http-status'; // HTTP status codes library
import catchAsync from '../../utils/catchAsync'; // Utility for catching and handling async errors

// Controller for creating a new user
const createUser = catchAsync(async (req, res) => {
  const user = req.body; // Extract user data from the request body

  // Call the service function to save the user into the database
  const result = await userServices.createUserIntoDB(user);

  // Send a standardized success response back to the client
  sendResponse(res, {
    success: true, // Indicates the operation was successful
    statusCode: httpStatus.CREATED, // HTTP status code for OK (200)
    message: 'User registered successfully', // Success message
    data: result, // The result data from the service function
  });
});

// Controller for blocking a user
const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params; // Extract userId from the request parameters

  // Call the service function to block the user in the database
  const result = await userServices.blockUserIntoDB(userId);

  // Send a standardized success response back to the client
  sendResponse(res, {
    success: true, // Indicates the operation was successful
    statusCode: httpStatus.OK, // HTTP status code for OK (200)
    message: 'User blocked successfully', // Success message
    data: result, // The result data from the service function
  });
});

// Exporting the user controllers as an object
export const userControllers = {
  createUser, // Controller for creating a user
  blockUser, // Controller for blocking a user
};
