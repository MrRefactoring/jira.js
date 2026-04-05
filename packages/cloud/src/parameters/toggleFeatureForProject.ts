import { z } from 'zod';
import { ProjectFeatureStateSchema } from '../models';

export const ToggleFeatureForProjectSchema = z
  .object({
    /** The ID or (case-sensitive) key of the project. */
    projectIdOrKey: z.string(),
    /** The key of the feature. */
    featureKey: z.string(),
  })
  .extend(ProjectFeatureStateSchema.shape);

export type ToggleFeatureForProject = z.input<typeof ToggleFeatureForProjectSchema>;
