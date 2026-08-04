import { z } from 'zod';

export const MergeVersionsSchema = z.object({
  /** The ID of the version to delete. */
  id: z.string(),
  /** The ID of the version to merge into. */
  moveIssuesTo: z.string(),
});

export type MergeVersions = z.input<typeof MergeVersionsSchema>;
