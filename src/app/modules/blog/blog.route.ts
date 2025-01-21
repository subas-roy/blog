import exrress from 'express'; // Import Express framework for creating routes
import validateRequest from '../../middlewares/validateRequest'; // Middleware to validate request data against schemas
import { blogControllers } from './blog.controller'; // Controller functions for blog operations
import { blogValidations } from './blog.validation'; // Validation schemas for blog-related requests
import auth from '../../middlewares/auth'; // Middleware to handle authentication and authorization
import { USER_ROLE } from '../user/user.constant'; // Enum for user roles (e.g., 'admin', 'user')

const router = exrress.Router(); // Initialize a new Express Router object

/**
 * Route to create a new blog.
 * - Accessible by users with the 'user' role.
 * - Validates request body against the `createBlogValidationSchema`.
 * - Calls the `createBlog` controller to handle the logic.
 */
router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin), // Restrict access to 'user' role
  validateRequest(blogValidations.createBlogValidationSchema), // Validate request body
  blogControllers.createBlog, // Controller function to handle blog creation
);

/**
 * Route to fetch a single blog by its ID.
 * - Accessible by users with 'user' or 'admin' roles.
 * - Calls the `getSingleBlog` controller to fetch the blog.
 */
router.get(
  '/:id', // Route parameter for blog ID
  blogControllers.getSingleBlog, // Controller function to fetch a single blog
);

/**
 * Route to update a blog by its ID.
 * - Accessible by users with the 'user' role.
 * - Validates request body against the `updateBlogValidationSchema`.
 * - Calls the `updateBlog` controller to handle the update logic.
 */
router.patch(
  '/:id', // Route parameter for blog ID
  auth(USER_ROLE.user), // Restrict access to 'user' role
  validateRequest(blogValidations.updateBlogValidationSchema), // Validate request body
  blogControllers.updateBlog, // Controller function to update the blog
);

/**
 * Route to fetch all blogs.
 * - Accessible by users with 'admin' or 'user' roles.
 * - Calls the `getAllBlogs` controller to fetch all blogs.
 */
router.get(
  '/', // Route for fetching all blogs
  blogControllers.getAllBlogs, // Controller function to fetch all blogs
);

/**
 * Route to delete a blog by its ID.
 * - Accessible by users with the 'user' role.
 * - Calls the `deleteBlog` controller to handle the deletion logic.
 */
router.delete(
  '/:id', // Route parameter for blog ID
  auth(USER_ROLE.user), // Restrict access to 'user' role
  blogControllers.deleteBlog, // Controller function to delete the blog
);

// Export the router object to be used in the application
export const blogRoutes = router;
