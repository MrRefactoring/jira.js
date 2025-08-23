import { z } from 'zod';

export const GetIssueTypeScreenSchemeProjectAssociationsParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /**
   * The list of project IDs. To include multiple projects, separate IDs with ampersand:
   * `projectId=10000&projectId=10001`.
   */
  projectId: z.array(z.number().int()),
});

export type GetIssueTypeScreenSchemeProjectAssociationsParameters = z.infer<
  typeof GetIssueTypeScreenSchemeProjectAssociationsParametersSchema
>;
