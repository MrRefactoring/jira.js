import { z } from 'zod';

export const GetIssueTypeSchemesMappingSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
  /**
   * The list of issue type scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example,
   * `issueTypeSchemeId=10000&issueTypeSchemeId=10001`.
   */
  issueTypeSchemeId: z.array(z.number()).optional(),
});

export type GetIssueTypeSchemesMapping = z.input<typeof GetIssueTypeSchemesMappingSchema>;
