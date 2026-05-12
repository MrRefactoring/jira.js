import { z } from 'zod';

export const FeatureToggleRequestSchema = z.object({
  boardId: z.number().optional(),
  enabling: z.boolean().optional(),
  feature: z.string().optional(),
});

export type FeatureToggleRequest = z.infer<typeof FeatureToggleRequestSchema>;
