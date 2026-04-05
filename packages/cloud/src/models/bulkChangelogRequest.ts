import { z } from 'zod';

/** Request bean for bulk changelog retrieval */
export const BulkChangelogRequestSchema = z.object({
  /** List of field IDs to filter changelogs */
  fieldIds: z.array(z.string()).optional(),
  /** List of issue IDs/keys to fetch changelogs for */
  issueIdsOrKeys: z.array(z.string()),
  /** The maximum number of items to return per page */
  maxResults: z.number().optional(),
  /** The cursor for pagination */
  nextPageToken: z.string().optional(),
});

export type BulkChangelogRequest = z.infer<typeof BulkChangelogRequestSchema>;
