import { z } from 'zod';
import { apiObject } from '#/core';

export const EntitlementModelV2Schema = apiObject({
  id: z.string().optional(),
  type: z.string().optional(),
  attributes: apiObject({
    key: z.string().optional(),
    planKey: z.string().nullish(),
    plan: z.string().nullish(),
  }).optional(),
});

export type EntitlementModelV2 = z.infer<typeof EntitlementModelV2Schema>;
