import { z } from 'zod';

/** A container for the watch status of a list of issues. */
export const BulkIssueIsWatchingSchema = z.object({
  /** The map of issue ID to boolean watch status. */
  issuesIsWatching: z.record(z.string(), z.any()).optional(),
});

export type BulkIssueIsWatching = z.infer<typeof BulkIssueIsWatchingSchema>;
