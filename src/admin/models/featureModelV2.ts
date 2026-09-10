import { z } from 'zod';
import { apiObject } from '#/core';

export const FeatureModelV2Schema = apiObject({
  id: z.string().optional(),
  type: z.string().optional(),
  attributes: apiObject({
    fields: z.record(z.string(), z.any()).optional(),
  }).optional(),
});

export type FeatureModelV2 = z.infer<typeof FeatureModelV2Schema>;
