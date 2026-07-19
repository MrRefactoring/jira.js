import { z } from 'zod';

export const GetIssueTypeScreenSchemeMappingsSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
  /**
   * The list of issue type screen scheme IDs. To include multiple issue type screen schemes, separate IDs with
   * ampersand: `issueTypeScreenSchemeId=10000&issueTypeScreenSchemeId=10001`.
   */
  issueTypeScreenSchemeId: z.array(z.number()).optional(),
});

export type GetIssueTypeScreenSchemeMappings = z.input<typeof GetIssueTypeScreenSchemeMappingsSchema>;
