import { z } from 'zod';
import { userRole } from './user.constant';

const userValidationSchemaforCreate = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .min(2, { message: 'Name must be at least 2 characters long' })
      .max(20, { message: 'Name must be at most 20 characters long' }),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email(),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .max(20, { message: 'Password should not exceed 20 character!!!' })
      .optional(),
    role: z
      .enum([...userRole] as [string, ...string[]], {
        required_error: 'Role is required',
        invalid_type_error: 'Role must be a string',
      })
      .optional(),
    isBlocked: z.boolean().default(false),
  }),
});

const userValidationSchemaforLogIn = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    }),
    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    }),
  }),
});

export const UserValidationSchemas = {
  userValidationSchemaforCreate,
  userValidationSchemaforLogIn,
};
