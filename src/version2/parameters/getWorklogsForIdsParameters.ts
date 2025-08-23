import { z } from 'zod';

export const GetWorklogsForIdsParametersSchema = z.object({
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about worklogs in the response. This parameter accepts `properties` that returns the properties of each
   * worklog.
   */
  expand: z.string().optional(),
  /** A list of worklog IDs. */
  ids: z.array(z.number().int()),
});

export type GetWorklogsForIdsParameters = z.infer<typeof GetWorklogsForIdsParametersSchema>;
