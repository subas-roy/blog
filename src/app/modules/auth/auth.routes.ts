import express from 'express'; // Importing Express framework
import validateRequest from '../../middlewares/validateRequest'; // Middleware to validate requests against a schema
import { authValidations } from './auth.validation'; // Authentication validation schemas
import { authControllers } from './auth.controller'; // Authentication controller functions
import auth from '../../middlewares/auth'; // Middleware for authorization checks
import { USER_ROLE } from '../user/user.constant'; // User role constants

const router = express.Router(); // Create a new Express router

/**
 * @route POST /login
 * @description Handles user login
 * @access Public
 * @middleware validateRequest(authValidations.loginValidationSchema) - Validates login request body
 * @controller authControllers.loginUser - Handles the login logic
 */
router.post(
  '/login',
  validateRequest(authValidations.loginValidationSchema), // Middleware to validate the login payload
  authControllers.loginUser, // Controller to handle login logic
);

/**
 * @route DELETE /:id
 * @description Allows admin users to delete blogs
 * @access Admin only
 * @middleware auth(USER_ROLE.admin) - Ensures only admin users can access this route
 * @controller authControllers.deleteBlog - Handles the blog deletion logic
 */
router.delete(
  '/:id',
  auth(USER_ROLE.admin), // Middleware to authorize only admin users
  authControllers.deleteBlog, // Controller to delete the specified blog
);

/**
 * @route POST /refresh-token
 * @description Retrieves a new access token using the refresh token
 * @access Public
 * @middleware validateRequest(authValidations.refreshTokenValidatioinSchema) - Validates the refresh token payload
 * @controller authControllers.refreshToken - Handles refresh token logic
 */
router.post(
  '/refresh-token',
  validateRequest(authValidations.refreshTokenValidatioinSchema), // Middleware to validate the refresh token payload
  authControllers.refreshToken, // Controller to handle token refreshing
);

// Export the router as `authRoutes` for use in other modules
export const authRoutes = router;
