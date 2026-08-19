import { z } from 'zod';
import { apiObject } from '#/core';
import { FeatureSchema } from './feature';

export const ToggleFeaturesSchema = apiObject({
  features: z.array(FeatureSchema).optional(),
});

export type ToggleFeatures = z.infer<typeof ToggleFeaturesSchema>;
