import { z } from 'zod';

export const GetFeatureFlagByIdSchema = z.object({
  /** The ID of the Feature Flag to fetch. */
  featureFlagId: z.string().max(255, 'featureFlagId must be at most 255 characters'),
});

export type GetFeatureFlagById = z.input<typeof GetFeatureFlagByIdSchema>;
