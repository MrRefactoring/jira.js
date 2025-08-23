import { z } from 'zod';

export const ToggleFeatureForProjectParametersSchema = z.object({
  /** The ID or (case-sensitive) key of the project. */
  projectIdOrKey: z.string(),
  /** The key of the feature. */
  featureKey: z.string(),
  /** The feature state. */
  state: z.enum(['ENABLED', 'DISABLED', 'COMING_SOON']).optional(),
});

export type ToggleFeatureForProjectParameters = z.infer<typeof ToggleFeatureForProjectParametersSchema>;
