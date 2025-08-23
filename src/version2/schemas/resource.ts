import { z } from 'zod';

export const ResourceSchema = z.object({
  description: z.string().optional(),
  file: z.string().optional(),
  filename: z.string().optional(),
  inputStream: z.object({}).optional(),
  open: z.boolean().optional(),
  readable: z.boolean().optional(),
  uri: z.string().optional(),
  url: z.string().optional(),
});

export type Resource = z.infer<typeof ResourceSchema>;
