import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email('Invalid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
    role: z.enum(['admin', 'user']).default('user').optional(),
    isBlocked: z.boolean().default(false).optional(),
  }),
});

export const userValidations = {
  createUserValidationSchema,
};
