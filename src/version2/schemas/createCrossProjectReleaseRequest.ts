import { z } from 'zod';

export const CreateCrossProjectReleaseRequestSchema = z.object({
  /** The cross-project release name. */
  name: z.string(),
  /** The IDs of the releases to include in the cross-project release. */
  releaseIds: z.array(z.number().int()).optional(),
});

export type CreateCrossProjectReleaseRequest = z.infer<typeof CreateCrossProjectReleaseRequestSchema>;
