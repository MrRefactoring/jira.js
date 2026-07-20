import { z } from 'zod';
import { apiObject } from '#/core';

export const ResourceSchema = apiObject({
  contentAsByteArray: z.array(z.string()).optional(),
  description: z.string().optional(),
  file: z.string().optional(),
  filename: z.string().optional(),
  inputStream: z.record(z.string(), z.any()).optional(),
  open: z.boolean().optional(),
  readable: z.boolean().optional(),
  uri: z.url().optional(),
  url: z.string().optional(),
});

export type Resource = z.infer<typeof ResourceSchema>;
