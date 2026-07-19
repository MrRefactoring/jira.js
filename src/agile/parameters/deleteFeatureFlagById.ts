import { z } from 'zod';

export const DeleteFeatureFlagByIdSchema = z.object({
  /** The ID of the Feature Flag to delete. */
  featureFlagId: z.string().max(255, 'featureFlagId must be at most 255 characters'),
});

export type DeleteFeatureFlagById = z.input<typeof DeleteFeatureFlagByIdSchema>;
