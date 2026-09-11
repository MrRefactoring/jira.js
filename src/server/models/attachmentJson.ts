import { z } from 'zod';
import { apiObject } from '#/core';
import { UserJsonSchema } from './userJson';

export const AttachmentJsonSchema = apiObject({
  author: UserJsonSchema.optional(),
  content: z.string().optional(),
  created: z.coerce.date().optional(),
  filename: z.string().optional(),
  id: z.string().optional(),
  mimeType: z.string().optional(),
  self: z.string().optional(),
  size: z.number().optional(),
  thumbnail: z.string().optional(),
});

export type AttachmentJson = z.infer<typeof AttachmentJsonSchema>;
