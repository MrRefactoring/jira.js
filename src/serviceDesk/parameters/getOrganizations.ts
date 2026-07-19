import { z } from 'zod';

export const GetOrganizationsSchema = z.object({
  /**
   * The starting index of the returned objects. Base index: 0. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#pagination) section for more
   * details.
   */
  start: z.number().optional(),
  /**
   * The maximum number of organizations to return per page. Default: 50. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#pagination) section for more
   * details.
   */
  limit: z.number().optional(),
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId: z.string().optional(),
});

export type GetOrganizations = z.input<typeof GetOrganizationsSchema>;
