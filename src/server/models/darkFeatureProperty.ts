import { z } from 'zod';
import { apiObject } from '#/core';

export const DarkFeaturePropertySchema = apiObject({
  enabled: z.boolean().optional(),
});

export type DarkFeatureProperty = z.infer<typeof DarkFeaturePropertySchema>;
