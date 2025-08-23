import { z } from 'zod';

/** Request bean for bulk changelog retrieval */
export const BulkChangelogRequestBeanSchema = z.object({
  /** List of field IDs to filter changelogs */
  fieldIds: z.array(z.string()).optional(),
  /** List of issue IDs/keys to fetch changelogs for */
  issueIdsOrKeys: z.array(z.string()),
  /** The maximum number of items to return per page */
  maxResults: z.number().int().optional(),
  /** The cursor for pagination */
  nextPageToken: z.string().optional(),
});

export type BulkChangelogRequestBean = z.infer<typeof BulkChangelogRequestBeanSchema>;
