import { z } from 'zod';

export const GetFeaturesForProjectParametersSchema = z.object({
  /** The ID or (case-sensitive) key of the project. */
  projectIdOrKey: z.string(),
});

export type GetFeaturesForProjectParameters = z.infer<typeof GetFeaturesForProjectParametersSchema>;
