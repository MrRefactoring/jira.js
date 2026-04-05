import { z } from 'zod';

export const EstimationConfigurationSchema = z.object({
  localisedDescription: z.string().optional(),
  localisedName: z.string().optional(),
  value: z.enum(['STORY_POINTS', 'ORIGINAL_ESTIMATE']).optional(),
});

export type EstimationConfiguration = z.infer<typeof EstimationConfigurationSchema>;
