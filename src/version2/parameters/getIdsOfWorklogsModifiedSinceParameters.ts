import { z } from 'zod';

export const GetIdsOfWorklogsModifiedSinceParametersSchema = z.object({
  /** The date and time, as a UNIX timestamp in milliseconds, after which updated worklogs are returned. */
  since: z.number().int().optional(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about worklogs in the response. This parameter accepts `properties` that returns the properties of each
   * worklog.
   */
  expand: z.string().optional(),
});

export type GetIdsOfWorklogsModifiedSinceParameters = z.infer<typeof GetIdsOfWorklogsModifiedSinceParametersSchema>;
