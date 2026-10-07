import { z } from 'zod';
import { apiObject } from '#/core';

export const EntitlementModelV2Schema = apiObject({
  id: z.string().optional(),
  type: z.string().optional(),
  attributes: z.record(z.string(), z.any()).optional(),
  links: z.record(z.string(), z.any()).optional(),
});

export type EntitlementModelV2 = z.infer<typeof EntitlementModelV2Schema>;
