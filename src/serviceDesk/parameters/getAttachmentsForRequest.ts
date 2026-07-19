import { z } from 'zod';

export const GetAttachmentsForRequestSchema = z.object({
  /** The ID or key of the customer request from which the attachments will be listed. */
  issueIdOrKey: z.string(),
  /**
   * The starting index of the returned attachment. Base index: 0. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#pagination) section for more
   * details.
   */
  start: z.number(),
  /**
   * The maximum number of comments to return per page. Default: 50. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#pagination) section for more
   * details.
   */
  limit: z.number(),
});

export type GetAttachmentsForRequest = z.input<typeof GetAttachmentsForRequestSchema>;
