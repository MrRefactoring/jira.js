import { z } from 'zod';

export const GetUsersInOrganizationSchema = z.object({
  /** The ID of the organization. */
  organizationId: z.number(),
  /**
   * The starting index of the returned objects. Base index: 0. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#pagination) section for more
   * details.
   */
  start: z.number().optional(),
  /**
   * The maximum number of users to return per page. Default: 50. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#pagination) section for more
   * details.
   */
  limit: z.number().optional(),
});

export type GetUsersInOrganization = z.input<typeof GetUsersInOrganizationSchema>;
