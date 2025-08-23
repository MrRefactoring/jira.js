import { z } from 'zod';

export const BulkGetGroupsParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /**
   * The ID of a group. To specify multiple IDs, pass multiple `groupId` parameters. For example,
   * `groupId=5b10a2844c20165700ede21g&groupId=5b10ac8d82e05b22cc7d4ef5`.
   */
  groupId: z.array(z.string()).optional(),
  /**
   * The name of a group. To specify multiple names, pass multiple `groupName` parameters. For example,
   * `groupName=administrators&groupName=jira-software-users`.
   */
  groupName: z.array(z.string()).optional(),
  /** The access level of a group. Valid values: 'site-admin', 'admin', 'user'. */
  accessType: z.string().optional(),
  /**
   * The application key of the product user groups to search for. Valid values: 'jira-servicedesk', 'jira-software',
   * 'jira-product-discovery', 'jira-core'.
   */
  applicationKey: z.string().optional(),
});

export type BulkGetGroupsParameters = z.infer<typeof BulkGetGroupsParametersSchema>;
