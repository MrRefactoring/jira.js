import { z } from 'zod';

export const MergeSchema = z.object({
  /**
   * The version to set fixVersion to on issues where the deleted version is the fix version, If null then the
   * fixVersion is removed.
   */
  moveIssuesTo: z.string(),
  /** The version that will be merged to version moveIssuesTo and removed */
  id: z.string(),
});

export type Merge = z.input<typeof MergeSchema>;
