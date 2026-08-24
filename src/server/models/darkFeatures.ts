import { z } from 'zod';
import { apiObject } from '#/core';

export const DarkFeaturesSchema = apiObject({
  siteFeatures: z.record(z.string(), z.any()).optional(),
  systemFeatures: z.record(z.string(), z.any()).optional(),
});

export type DarkFeatures = z.infer<typeof DarkFeaturesSchema>;
