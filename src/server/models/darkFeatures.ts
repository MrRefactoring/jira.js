import { z } from 'zod';
import { apiObject } from '#/core';
import { DarkFeaturePropertySchema } from './darkFeatureProperty';

export const DarkFeaturesSchema = apiObject({
  siteFeatures: z.record(z.string(), DarkFeaturePropertySchema).optional(),
  systemFeatures: z.record(z.string(), DarkFeaturePropertySchema).optional(),
});

export type DarkFeatures = z.infer<typeof DarkFeaturesSchema>;
