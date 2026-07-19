import { z } from 'zod';

export const GetRequestTypesSchema = z.object({
  /**
   * The ID of the service desk whose customer request types are to be returned. This can alternatively be a [project
   * identifier.](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#project-identifiers)
   */
  serviceDeskId: z.string(),
  /** Filters results to those in a customer request type group. */
  groupId: z.number().optional(),
  expand: z.array(z.string()).optional(),
  /** The string to be used to filter the results. */
  searchQuery: z.string().optional(),
  /**
   * The starting index of the returned objects. Base index: 0. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#pagination) section for more
   * details.
   */
  start: z.number().optional(),
  /**
   * The maximum number of items to return per page. Default: 50. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#pagination) section for more
   * details.
   */
  limit: z.number().optional(),
  /** Whether to include hidden request types when searching with `searchQuery`. */
  includeHiddenRequestTypesInSearch: z.boolean().optional(),
  /** Request type restriction status (`open` or `restricted`) used to filter the results. */
  restrictionStatus: z.string().optional(),
});

export type GetRequestTypes = z.input<typeof GetRequestTypesSchema>;
