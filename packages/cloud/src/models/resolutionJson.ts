import { z } from 'zod';

export const ResolutionJsonSchema = z.object({
  default: z.boolean().optional(),
  description: z.string().optional(),
  iconUrl: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  self: z.string().optional(),
});

export type ResolutionJson = z.infer<typeof ResolutionJsonSchema>;
