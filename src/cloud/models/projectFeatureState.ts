import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** Details of the feature state. */

export const ProjectFeatureStateSchema = apiObject({
  /** The feature state. */
  state: openEnum(['ENABLED', 'DISABLED', 'COMING_SOON']).optional(),
});

export type ProjectFeatureState = z.infer<typeof ProjectFeatureStateSchema>;
