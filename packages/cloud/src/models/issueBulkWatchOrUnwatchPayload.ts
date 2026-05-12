import { z } from 'zod';

/** Issue Bulk Watch Or Unwatch Payload */
export const IssueBulkWatchOrUnwatchPayloadSchema = z.object({
  /**
   * List of issue IDs or keys which are to be bulk watched or unwatched. These IDs or keys can be from different
   * projects and issue types.
   */
  selectedIssueIdsOrKeys: z.array(z.string()),
});

export type IssueBulkWatchOrUnwatchPayload = z.infer<typeof IssueBulkWatchOrUnwatchPayloadSchema>;
