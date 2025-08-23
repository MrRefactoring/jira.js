import { z } from 'zod';

export const GetProjectVersionsParametersSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information in the response. This parameter accepts `operations`, which returns actions that can be performed on
   * the version.
   */
  expand: z.string().optional(),
});

export type GetProjectVersionsParameters = z.infer<typeof GetProjectVersionsParametersSchema>;
