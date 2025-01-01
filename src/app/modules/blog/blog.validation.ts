import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
    author: z.string(),
    isPublished: z.boolean(),
  }),
});

export const blogValidations = {
  createBlogValidationSchema,
};
