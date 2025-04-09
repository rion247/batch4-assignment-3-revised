import { z } from 'zod';

const blogValidationSchemaforCreate = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Blog Title is required',
      invalid_type_error: 'Blog Title must be a string',
    }),
    content: z.string({
      required_error: 'Blog Content is required',
      invalid_type_error: 'Blog Content must be a string',
    }),
    isPublished: z.boolean().default(true),
  }),
});

const blogValidationSchemaforUpdate = z.object({
  body: z
    .object({
      title: z
        .string({
          required_error: 'Blog Title is required',
          invalid_type_error: 'Blog Title must be a string',
        })
        .optional(),
      content: z
        .string({
          required_error: 'Blog Content is required',
          invalid_type_error: 'Blog Content must be a string',
        })
        .optional(),
    })
    .strict({
      message: 'Only Title and Content fields are allowed.',
    }),
});

export const BlogValidationSchemas = {
  blogValidationSchemaforCreate,
  blogValidationSchemaforUpdate,
};
