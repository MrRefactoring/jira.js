import { z } from 'zod';
import { apiObject } from '#/core';

export const EstimationConfigurationSchema = apiObject({
  localisedDescription: z.string().optional(),
  localisedName: z.string().optional(),
  value: z.enum(['STORY_POINTS', 'ORIGINAL_ESTIMATE']).optional(),
});

export type EstimationConfiguration = z.infer<typeof EstimationConfigurationSchema>;
