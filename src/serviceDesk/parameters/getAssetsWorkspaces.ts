import { z } from 'zod';

export const GetAssetsWorkspacesSchema = z.object({
  /**
   * The starting index of the returned workspace IDs. Base index: 0 See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#pagination) section for more
   * details.
   */
  start: z.number().optional(),
  /**
   * The maximum number of workspace IDs to return per page. Default: 50 See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#pagination) section for more
   * details.
   */
  limit: z.number().optional(),
});

export type GetAssetsWorkspaces = z.input<typeof GetAssetsWorkspacesSchema>;
