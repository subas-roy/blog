import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync'; // Utility to handle async errors
import AppError from '../errors/AppError'; // Custom error handling class
import httpStatus from 'http-status'; // HTTP status codes for easy reference
import jwt, { JwtPayload } from 'jsonwebtoken'; // JWT for token validation
import config from '../config'; // App configuration, including secrets
import { TUserRole } from '../modules/user/user.interface'; // User roles interface
import { isUserExistsById } from '../modules/user/user.model'; // Method to check if a user exists in the database

/**
 * Authorization middleware to check user roles and token validity.
 * This middleware will decode the JWT token and verify the user's identity and role.
 * It can accept multiple roles and will only allow access if the user's role matches one of the allowed roles.
 *
 * @param requiredRoles - List of roles allowed to access the route.
 * @returns A middleware function that checks authentication and authorization.
 */
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Extract token from the 'Authorization' header
    const token = req.headers.authorization;

    // If the token is not provided, throw an error
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // Decode the JWT token using the secret
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string, // Secret key to verify the token
    ) as JwtPayload;

    // Extract user information from the decoded token
    const { role, userId } = decoded;

    // Check if the user exists in the database using the userId from the token
    const user = await isUserExistsById(userId);

    // If user is not found, throw an error
    if (!user) {
      throw new AppError(httpStatus.FORBIDDEN, 'User not found!');
    }

    // Check if the user is blocked
    const isBlocked = user?.isBlocked;

    // If user is blocked, throw an error
    if (isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
    }

    // Check if the user's role is one of the required roles
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // Attach the user information to the request object for further use in subsequent middleware or controllers
    req.user = { _id: user._id, role: user.role };

    // Proceed to the next middleware or route handler
    next();
  });
};

export default auth;
