import { z } from 'zod';

export const GetIdsOfWorklogsModifiedSinceSchema = z.object({
  /** The date and time, as a UNIX timestamp in milliseconds, after which updated worklogs are returned. */
  since: z.number().optional(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
   * information about worklogs in the response. This parameter accepts `properties` that returns the properties of each
   * worklog.
   */
  expand: z
    .union([z.string(), z.array(z.string()), z.enum(['properties']), z.array(z.enum(['properties']))])
    .optional(),
});

export type GetIdsOfWorklogsModifiedSince = z.input<typeof GetIdsOfWorklogsModifiedSinceSchema>;
