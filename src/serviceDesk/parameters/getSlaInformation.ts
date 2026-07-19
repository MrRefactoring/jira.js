import { z } from 'zod';

export const GetSlaInformationSchema = z.object({
  /** The ID or key of the customer request whose SLAs will be retrieved. */
  issueIdOrKey: z.string(),
  /**
   * The starting index of the returned objects. Base index: 0. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#pagination) section for more
   * details.
   */
  start: z.number().optional(),
  /**
   * The maximum number of request types to return per page. Default: 50. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#pagination) section for more
   * details.
   */
  limit: z.number().optional(),
});

export type GetSlaInformation = z.input<typeof GetSlaInformationSchema>;
