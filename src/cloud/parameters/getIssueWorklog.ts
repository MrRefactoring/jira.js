import { z } from 'zod';

export const GetIssueWorklogSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
  /** The worklog start date and time, as a UNIX timestamp in milliseconds, after which worklogs are returned. */
  startedAfter: z.number().optional(),
  /** The worklog start date and time, as a UNIX timestamp in milliseconds, before which worklogs are returned. */
  startedBefore: z.number().optional(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
   * information about worklogs in the response. This parameter accepts`properties`, which returns worklog properties.
   */
  expand: z
    .union([z.string(), z.array(z.string()), z.enum(['properties']), z.array(z.enum(['properties']))])
    .optional(),
});

export type GetIssueWorklog = z.input<typeof GetIssueWorklogSchema>;
