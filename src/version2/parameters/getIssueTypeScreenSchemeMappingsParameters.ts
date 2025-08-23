import { z } from 'zod';

export const GetIssueTypeScreenSchemeMappingsParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /**
   * The list of issue type screen scheme IDs. To include multiple issue type screen schemes, separate IDs with
   * ampersand: `issueTypeScreenSchemeId=10000&issueTypeScreenSchemeId=10001`.
   */
  issueTypeScreenSchemeId: z.array(z.number().int()).optional(),
});

export type GetIssueTypeScreenSchemeMappingsParameters = z.infer<
  typeof GetIssueTypeScreenSchemeMappingsParametersSchema
>;
