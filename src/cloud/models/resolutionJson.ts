import { z } from 'zod';
import { apiObject } from '#/core';

export const ResolutionJsonSchema = apiObject({
  default: z.boolean().optional(),
  description: z.string().optional(),
  iconUrl: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  self: z.string().optional(),
});

export type ResolutionJson = z.infer<typeof ResolutionJsonSchema>;
