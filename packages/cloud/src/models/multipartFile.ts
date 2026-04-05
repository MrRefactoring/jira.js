import { z } from 'zod';
import { ResourceSchema } from '#/models/resource';

export const MultipartFileSchema = z.object({
  bytes: z.array(z.string()).optional(),
  contentType: z.string().optional(),
  empty: z.boolean().optional(),
  inputStream: z.record(z.string(), z.any()).optional(),
  name: z.string().optional(),
  originalFilename: z.string().optional(),
  resource: ResourceSchema.optional(),
  size: z.number().optional(),
});

export type MultipartFile = z.infer<typeof MultipartFileSchema>;
