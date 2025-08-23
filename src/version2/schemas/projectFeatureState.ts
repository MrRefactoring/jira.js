import { z } from 'zod';

/** Details of the feature state. */
export const ProjectFeatureStateSchema = z.object({
  /** The feature state. */
  state: z.enum(['ENABLED', 'DISABLED', 'COMING_SOON']).optional(),
});

export type ProjectFeatureState = z.infer<typeof ProjectFeatureStateSchema>;
