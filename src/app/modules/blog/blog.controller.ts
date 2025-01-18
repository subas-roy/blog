// Handles application Request and Response
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { blogServices } from './blog.service';
import AppError from '../../errors/AppError';

const createBlog = catchAsync(async (req, res) => {
  const payload = {
    ...req.body,
    author: req.user._id, // Automatically set the logged-in user as author
  };
  const result = await blogServices.createBlogIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  console.log('Cookies: ', req.cookies);
  const result = await blogServices.getAllBlogesFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blogs fetched successfully',
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await blogServices.getSingleBlogFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog fetched successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const blog = req.body;
  const result = await blogServices.updateBlogIntoDB(id, blog);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  // Ensure the user is authenticated properly
  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }

  // Fetch the blog to verify ownership
  const blog = await blogServices.getSingleBlogFromDB(id);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  // Check if the logged-in user is the author
  if (blog.author.toString() !== userId.toString()) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'You can only delete your own blog',
    );
  }

  const result = await blogServices.deleteBlogFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog deleted successfully',
    data: result,
  });
});

export const blogControllers = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
