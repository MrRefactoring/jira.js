import { z } from 'zod';
import { ProjectFeatureStateSchema } from '../models';

export const ToggleFeatureForProjectSchema = z.object(ProjectFeatureStateSchema.shape).extend({
  /** The ID or (case-sensitive) key of the project. */
  projectIdOrKey: z.string(),
  /** The key of the feature. */
  featureKey: z.string(),
});

export type ToggleFeatureForProject = z.input<typeof ToggleFeatureForProjectSchema>;
