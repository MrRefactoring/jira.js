import { z } from 'zod';

export const DeleteProjectRoleSchema = z.object({
  /**
   * The ID of the project role to delete. Use [Get all project
   * roles](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-role/#api-rest-api-3-role-get) to get
   * a list of project role IDs.
   */
  id: z.number(),
  /**
   * The ID of the project role that will replace the one being deleted. The swap will attempt to swap the role in
   * schemes (notifications, permissions, issue security), workflows, worklogs and comments.
   */
  swap: z.number().optional(),
});

export type DeleteProjectRole = z.input<typeof DeleteProjectRoleSchema>;
