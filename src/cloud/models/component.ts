import { z } from 'zod';
import { apiObject } from '#/core';

export const ComponentSchema = apiObject({
  ari: z.string().optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  name: z.string().optional(),
  self: z.string().optional(),
});

export type Component = z.infer<typeof ComponentSchema>;
