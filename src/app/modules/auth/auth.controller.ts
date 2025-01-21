import catchAsync from '../../utils/catchAsync'; // Utility to handle async errors
import httpStatus from 'http-status'; // HTTP status codes utility
import sendResponse from '../../utils/sendResponse'; // Utility for sending structured API responses
import { authServices } from './auth.service'; // Authentication service functions
import config from '../../config'; // Application configuration
import AppError from '../../errors/AppError'; // Custom error class for handling errors
import { blogServices } from '../blog/blog.service'; // Blog service functions

// Controller to handle user login
const loginUser = catchAsync(async (req, res) => {
  // Call the login service with the provided request body
  const result = await authServices.loginUser(req.body);
  const { refreshToken, token } = result;

  // Set a secure HTTP-only cookie for the refresh token
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production', // Secure only in production environment
    httpOnly: true, // Prevent access via client-side JavaScript
  });

  // Send a success response with the token
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful', // Success message for the client
    data: { token }, // Include the token in the response
  });
});

// Controller to handle refresh token functionality
const refreshToken = catchAsync(async (req, res) => {
  // Retrieve the refresh token from cookies
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshToken(refreshToken);

  // Send a success response with the new access token
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh token is retrieved successfully', // Success message for the client
    data: result, // Include the new token in the response
  });
});

// Controller to delete a blog (specific to the authenticated user)
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params; // Blog ID from request parameters
  const userId = req.user._id; // Authenticated user's ID

  // Ensure the user is authenticated
  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }

  // Fetch the blog to verify its existence
  const blog = await blogServices.getSingleBlogFromDB(id);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found'); // Throw error if the blog does not exist
  }

  // Call the service to delete the blog
  const result = await authServices.deleteBlogFromDB(id);

  // Send a success response after deletion
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog deleted successfully', // Success message for the client
    data: result, // Include the deleted blog's details in the response
  });
});

// Export the authentication-related controllers
export const authControllers = {
  loginUser, // Login functionality
  refreshToken, // Token refresh functionality
  deleteBlog, // Delete blog functionality
};
