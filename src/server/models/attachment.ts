import { z } from 'zod';
import { apiObject } from '#/core';
import { UserJsonSchema } from './userJson';

export const AttachmentSchema = apiObject({
  self: z.string().optional(),
  id: z.string().optional(),
  filename: z.string().optional(),
  author: UserJsonSchema.optional(),
  created: z.string().optional(),
  size: z.number().optional(),
  mimeType: z.string().optional(),
  content: z.string().optional(),
  thumbnail: z.string().optional(),
  properties: z.record(z.string(), z.any()).optional(),
});

export type Attachment = z.infer<typeof AttachmentSchema>;
