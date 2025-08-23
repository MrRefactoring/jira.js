import { z } from 'zod';

export const GetBulkChangelogsParametersSchema = z.object({
  /** List of field IDs to filter changelogs */
  fieldIds: z.array(z.string()).optional(),
  /** List of issue IDs/keys to fetch changelogs for */
  issueIdsOrKeys: z.array(z.string()),
  /** The maximum number of items to return per page */
  maxResults: z.number().int().optional(),
  /** The cursor for pagination */
  nextPageToken: z.string().optional(),
});

export type GetBulkChangelogsParameters = z.infer<typeof GetBulkChangelogsParametersSchema>;
