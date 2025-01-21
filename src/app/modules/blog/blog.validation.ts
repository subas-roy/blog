import { z } from 'zod'; // Import Zod for schema validation

// Validation schema for creating a new blog
const createBlogValidationSchema = z.object({
  body: z.object({
    // Validate that the title is a string and is required
    title: z.string({
      invalid_type_error: 'Title must be string', // Custom error message for invalid type
      required_error: 'Title is required', // Custom error message for missing field
    }),
    // Validate that the content is a string and is required
    content: z.string({
      invalid_type_error: 'Content must be string', // Custom error message for invalid type
      required_error: 'Content is required', // Custom error message for missing field
    }),
    // Validate that `isPublished` is a boolean and defaults to `true` if not provided
    isPublished: z.boolean().default(true),
  }),
});

// Validation schema for updating an existing blog
const updateBlogValidationSchema = z.object({
  body: z.object({
    // Validate that the title is a string if provided; optional for updates
    title: z
      .string({
        invalid_type_error: 'Title must be string', // Custom error message for invalid type
        required_error: 'Title is required', // Custom error message for missing field
      })
      .optional(), // Mark the field as optional
    // Validate that the content is a string if provided; optional for updates
    content: z
      .string({
        invalid_type_error: 'Content must be string', // Custom error message for invalid type
        required_error: 'Content is required', // Custom error message for missing field
      })
      .optional(), // Mark the field as optional
    // Validate that `isPublished` is a boolean if provided; optional for updates
    isPublished: z.boolean().default(true).optional(),
  }),
});

// Export the validation schemas as a single object for easy access
export const blogValidations = {
  createBlogValidationSchema, // Schema for validating blog creation
  updateBlogValidationSchema, // Schema for validating blog updates
};
