import { z } from 'zod';

export const GetProjectRoleSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
  /**
   * The ID of the project role. Use [Get all project
   * roles](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-role/#api-rest-api-3-role-get) to get
   * a list of project role IDs.
   */
  id: z.number(),
  /** Exclude inactive users. */
  excludeInactiveUsers: z.boolean().optional(),
});

export type GetProjectRole = z.input<typeof GetProjectRoleSchema>;
