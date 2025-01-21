import { z } from 'zod';

// Schema to validate the login request
// Ensures that the body contains both a valid email and password.
const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }), // Email is required and must be a string
    password: z.string({ required_error: 'Password is required' }), // Password is required and must be a string
  }),
});

// Schema to validate the refresh token from cookies
// Ensures that the refresh token is present in the cookies of the request.
const refreshTokenValidatioinSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Referesh token is required!', // The refresh token is mandatory
    }),
  }),
});

// Exporting the validation schemas as a single object for easy access
export const authValidations = {
  loginValidationSchema, // Schema for validating login request
  refreshTokenValidatioinSchema, // Schema for validating refresh token in cookies
};
