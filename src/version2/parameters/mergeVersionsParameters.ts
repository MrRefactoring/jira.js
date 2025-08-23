import { z } from 'zod';

export const MergeVersionsParametersSchema = z.object({
  /** The ID of the version to delete. */
  id: z.string(),
  /** The ID of the version to merge into. */
  moveIssuesTo: z.string(),
});

export type MergeVersionsParameters = z.infer<typeof MergeVersionsParametersSchema>;
