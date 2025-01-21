import exrress from 'express'; // Importing Express to create and manage routes
import { userControllers } from './user.controller'; // Importing user controllers for handling route logic
import { userValidations } from './user.validation'; // Importing validation schemas for request validation
import validateRequest from '../../middlewares/validateRequest'; // Middleware to validate incoming requests
import auth from '../../middlewares/auth'; // Middleware to handle authentication and authorization
import { USER_ROLE } from './user.constant'; // Constants defining user roles (e.g., 'admin', 'user')

const router = exrress.Router(); // Create a new Express router instance

// Route to register a new user
router.post(
  '/register', // Endpoint for user registration
  validateRequest(userValidations.createUserValidationSchema), // Middleware to validate the request body against the schema
  userControllers.createUser, // Controller function to handle user creation logic
);

// Route to block a user by their ID
router.patch(
  '/:userId/block', // Endpoint for blocking a user (requires userId as a URL parameter)
  auth(USER_ROLE.admin), // Middleware to authenticate and authorize the request (only admins allowed)
  userControllers.blockUser, // Controller function to handle user blocking logic
);

// Exporting the router object for use in other parts of the application
export const userRoutes = router;
