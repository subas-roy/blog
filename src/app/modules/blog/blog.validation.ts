import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'Title must be string',
      required_error: 'Title is required',
    }),
    content: z.string({
      invalid_type_error: 'Content must be string',
      required_error: 'Content is required',
    }),
    author: z.string({
      invalid_type_error: 'Author must be string',
      required_error: 'Author is required',
    }),
    isPublished: z.boolean().default(true),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: 'Title must be string',
        required_error: 'Title is required',
      })
      .optional(),
    content: z
      .string({
        invalid_type_error: 'Content must be string',
        required_error: 'Content is required',
      })
      .optional(),
    author: z
      .string({
        invalid_type_error: 'Author must be string',
        required_error: 'Author is required',
      })
      .optional(),
    isPublished: z.boolean().default(true).optional(),
  }),
});

export const blogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
