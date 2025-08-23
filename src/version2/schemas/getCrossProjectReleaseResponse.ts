import { z } from 'zod';

export const GetCrossProjectReleaseResponseSchema = z.object({
  /** The cross-project release name. */
  name: z.string().optional(),
  /** The IDs of the releases included in the cross-project release. */
  releaseIds: z.array(z.number().int()).optional(),
});

export type GetCrossProjectReleaseResponse = z.infer<typeof GetCrossProjectReleaseResponseSchema>;
