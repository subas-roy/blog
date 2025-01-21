// Handles application Request and Response
import sendResponse from '../../utils/sendResponse'; // Utility function for sending consistent API responses
import httpStatus from 'http-status'; // Standard HTTP status codes and messages
import catchAsync from '../../utils/catchAsync'; // Utility for handling asynchronous errors
import { blogServices } from './blog.service'; // Service layer for handling blog-related database operations
import AppError from '../../errors/AppError'; // Custom error class for application-specific errors

/**
 * Controller to create a new blog.
 * Associates the blog with the logged-in user as the author.
 */
const createBlog = catchAsync(async (req, res) => {
  const payload = {
    ...req.body, // Blog data from the client
    author: req?.user?._id, // Automatically associate the logged-in user as the author
  };
  const result = await blogServices.createBlogIntoDB(payload); // Call the service to save the blog in the database

  // Send a response indicating successful creation
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Blog created successfully',
    data: result,
  });
});

/**
 * Controller to fetch all blogs.
 * Retrieves a list of blogs based on the query parameters.
 */
const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogServices.getAllBlogesFromDB(req.query); // Fetch blogs from the database using query parameters

  // Send a response with the list of blogs
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blogs fetched successfully',
    data: result,
  });
});

/**
 * Controller to fetch a single blog by its ID.
 */
const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params; // Extract blog ID from the request parameters
  const result = await blogServices.getSingleBlogFromDB(id); // Fetch the blog from the database

  // Send a response with the blog details
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog fetched successfully',
    data: result,
  });
});

/**
 * Controller to update an existing blog.
 * Ensures that only the author of the blog can update it.
 */
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params; // Extract blog ID from the request parameters
  const userId = req.user._id; // Logged-in user ID
  const updateData = req.body; // New data for the blog

  // Ensure the user is authenticated
  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }

  // Fetch the blog to verify ownership
  const blog = await blogServices.getSingleBlogFromDB(id);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  // Check if the logged-in user is the author of the blog
  if (!blog.author.equals(userId)) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You can only update your own blog',
    );
  }

  const result = await blogServices.updateBlogIntoDB(id, updateData); // Update the blog in the database

  // Send a response indicating successful update
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog updated successfully',
    data: result,
  });
});

/**
 * Controller to delete an existing blog.
 * Ensures that only the author of the blog can delete it.
 */
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params; // Extract blog ID from the request parameters
  const userId = req.user._id; // Logged-in user ID

  // Ensure the user is authenticated
  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }

  // Fetch the blog to verify ownership
  const blog = await blogServices.getSingleBlogFromDB(id);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  // Check if the logged-in user is the author of the blog
  if (!blog.author.equals(userId)) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You can only delete your own blog',
    );
  }

  const result = await blogServices.deleteBlogFromDB(id); // Delete the blog from the database

  // Send a response indicating successful deletion
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog deleted successfully',
    data: result,
  });
});

// Exporting the controllers as an object for modular use
export const blogControllers = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
