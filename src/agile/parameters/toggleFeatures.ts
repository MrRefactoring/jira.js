import { z } from 'zod';
import { FeatureToggleRequestSchema } from '../models';

export const ToggleFeaturesSchema = z.object({
  boardId: z.number(),
  body: FeatureToggleRequestSchema,
});

export type ToggleFeatures = z.input<typeof ToggleFeaturesSchema>;
