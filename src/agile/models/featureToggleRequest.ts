import { z } from 'zod';
import { apiObject } from '#/core';

export const FeatureToggleRequestSchema = apiObject({
  boardId: z.number().optional(),
  enabling: z.boolean().optional(),
  feature: z.string().optional(),
});

export type FeatureToggleRequest = z.infer<typeof FeatureToggleRequestSchema>;
