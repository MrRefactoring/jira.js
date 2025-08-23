import { z } from 'zod';

export const GetWorklogParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The ID of the worklog. */
  id: z.string(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about work logs in the response. This parameter accepts
   *
   * `properties`, which returns worklog properties.
   */
  expand: z.string().optional(),
});

export type GetWorklogParameters = z.infer<typeof GetWorklogParametersSchema>;
