import { z } from 'zod';
import { apiObject } from '#/core';

export const FeatureFilterSchema = apiObject({
  /** Returns workspaces, which contains feature listed */
  features: z.array(z.string()).optional(),
});

export type FeatureFilter = z.infer<typeof FeatureFilterSchema>;
