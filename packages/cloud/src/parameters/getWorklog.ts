import { z } from 'zod';

export const GetWorklogSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The ID of the worklog. */
  id: z.string(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
   * information about work logs in the response. This parameter accepts
   *
   * `properties`, which returns worklog properties.
   */
  expand: z
    .union([z.string(), z.array(z.string()), z.enum(['properties']), z.array(z.enum(['properties']))])
    .optional(),
});

export type GetWorklog = z.input<typeof GetWorklogSchema>;
