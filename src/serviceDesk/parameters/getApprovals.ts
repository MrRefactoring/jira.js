import { z } from 'zod';

export const GetApprovalsSchema = z.object({
  /**
   * The starting index of the returned objects. Base index: 0. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#pagination) section for more
   * details.
   */
  start: z.number().optional(),
  /**
   * The maximum number of approvals to return per page. Default: 50. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#pagination) section for more
   * details.
   */
  limit: z.number().optional(),
  /** The ID or key of the customer request to be queried for its approvals. */
  issueIdOrKey: z.string(),
});

export type GetApprovals = z.input<typeof GetApprovalsSchema>;
