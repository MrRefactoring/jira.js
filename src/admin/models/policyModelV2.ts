import { z } from 'zod';
import { apiObject } from '#/core';

export const PolicyModelV2Schema = apiObject({
  id: z.string().optional(),
  type: z.string().optional(),
  attributes: z.record(z.string(), z.any()).optional(),
  links: z.record(z.string(), z.any()).optional(),
});

export type PolicyModelV2 = z.infer<typeof PolicyModelV2Schema>;
