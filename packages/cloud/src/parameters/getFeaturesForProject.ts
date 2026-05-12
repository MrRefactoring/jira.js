import { z } from 'zod';

export const GetFeaturesForProjectSchema = z.object({
  /** The ID or (case-sensitive) key of the project. */
  projectIdOrKey: z.string(),
});

export type GetFeaturesForProject = z.input<typeof GetFeaturesForProjectSchema>;
