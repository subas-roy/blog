import { z } from 'zod'; // Importing Zod, a library for schema validation

// Validation schema for creating a user
// This schema validates the structure and data types of the incoming request body
const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(), // Ensures 'name' is a string
    email: z.string().email('Invalid email address.'), // Ensures 'email' is a valid email address
    password: z.string().min(6, 'Password must be at least 6 characters long.'), // Ensures 'password' is a string with at least 6 characters
  }),
});

// Exporting validation schemas as an object for modular usage
export const userValidations = {
  createUserValidationSchema, // Validation schema for user creation
};
