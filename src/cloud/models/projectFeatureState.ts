import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of the feature state. */

export const ProjectFeatureStateSchema = apiObject({
  /** The feature state. */
  state: z.enum(['ENABLED', 'DISABLED', 'COMING_SOON']).optional(),
});

export type ProjectFeatureState = z.infer<typeof ProjectFeatureStateSchema>;
