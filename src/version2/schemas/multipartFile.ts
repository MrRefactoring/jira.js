import { z } from 'zod';
import { ResourceSchema } from './resource';

export const MultipartFileSchema = z.object({
  bytes: z.array(z.string()).optional(),
  contentType: z.string().optional(),
  empty: z.boolean().optional(),
  inputStream: z.object({}).optional(),
  name: z.string().optional(),
  originalFilename: z.string().optional(),
  resource: ResourceSchema.optional(),
  size: z.number().int().optional(),
});

export type MultipartFile = z.infer<typeof MultipartFileSchema>;
