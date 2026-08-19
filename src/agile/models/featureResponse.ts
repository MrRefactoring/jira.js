import { z } from 'zod';
import { apiObject } from '#/core';
import { FeatureSchema } from './feature';

export const FeatureResponseSchema = apiObject({
  features: z.array(FeatureSchema).optional(),
});

export type FeatureResponse = z.infer<typeof FeatureResponseSchema>;
