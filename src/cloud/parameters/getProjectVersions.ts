import { z } from 'zod';

export const GetProjectVersionsSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
   * information in the response. This parameter accepts `operations`, which returns actions that can be performed on
   * the version.
   */
  expand: z
    .union([z.string(), z.array(z.string()), z.enum(['operations']), z.array(z.enum(['operations']))])
    .optional(),
});

export type GetProjectVersions = z.input<typeof GetProjectVersionsSchema>;
