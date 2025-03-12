import config from '../../config'; // Configuration settings for the application (e.g., JWT secrets)
import AppError from '../../errors/AppError'; // Custom error handling class
import { isUserExistsById, User } from '../user/user.model'; // Import user model and helper function to check if a user exists
import { TLoginUser } from './auth.interface'; // Type definition for login request payload
import httpStatus from 'http-status'; // HTTP status codes
import jwt, { JwtPayload } from 'jsonwebtoken'; // JSON Web Token library
import { createToken } from './auth.utils'; // Utility function to create JWT tokens
import { Blog } from '../blog/blog.model'; // Blog model for deleting blog functionality

/**
 * Handles user login.
 *
 * 1. Verifies if the user exists by email.
 * 2. Checks if the user is blocked.
 * 3. Validates the password.
 * 4. Generates an access token and refresh token for the user.
 *
 * @param payload - Login details, including email and password.
 * @returns {Object} Contains the access token and refresh token.
 * @throws AppError if the user is not found, blocked, or if the password is incorrect.
 */
const loginUser = async (payload: TLoginUser) => {
  // Check if the user exists by email
  const isUserExists = await User.findOne({ email: payload.email });
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  // Check if the user is blocked
  const isUserBlocked = isUserExists.isBlocked;
  if (isUserBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already blocked');
  }

  // Validate the password
  const isPasswordMatched = isUserExists.password === payload.password;
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  // Access granted: create access token and refresh token
  const jwtPayload = {
    userId: isUserExists?.id,
    role: isUserExists?.role,
  };

  // Create access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // Create refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  // Return the generated tokens
  return {
    token: accessToken,
    refreshToken,
  };
};

/**
 * Handles refreshing the access token using a valid refresh token.
 *
 * 1. Verifies the provided refresh token.
 * 2. Checks if the user exists and is not blocked.
 * 3. Generates a new access token for the user.
 *
 * @param token - The refresh token to verify and use for generating a new access token.
 * @returns {Object} Contains the new access token.
 * @throws AppError if the token is invalid or if the user is blocked.
 */
const refreshToken = async (token: string) => {
  // Verify if the provided refresh token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userId } = decoded;

  // Check if the user exists
  const user = await isUserExistsById(userId);
  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'User not found!');
  }

  // Check if the user is blocked
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
  }

  // Generate a new access token
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // Return the new access token
  return {
    accessToken,
  };
};

/**
 * Marks a blog as deleted (soft delete) by setting its `isPublished` flag to `false`.
 *
 * @param id - The ID of the blog to delete.
 * @returns {Object} The updated blog document with `isPublished: false`.
 */
const deleteBlogFromDB = async (id: string) => {
  await Blog.findByIdAndUpdate(
    id,
    { isPublished: false }, // Mark the blog as not published (soft delete)
    // { new: true }, // Return the updated blog document
  );
};

// Exporting the authentication services
export const authServices = {
  loginUser,
  refreshToken,
  deleteBlogFromDB,
};
