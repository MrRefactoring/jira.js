import { z } from 'zod';

export const GetRequestTypeGroupsSchema = z.object({
  /**
   * The ID of the service desk whose customer request type groups are to be returned. This can alternatively be a
   * [project identifier.](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#project-identifiers)
   */
  serviceDeskId: z.string(),
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
});

export type GetRequestTypeGroups = z.input<typeof GetRequestTypeGroupsSchema>;
