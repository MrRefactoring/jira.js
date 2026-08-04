import { z } from 'zod';

export const GetCurrentUserSchema = z.object({
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
   * information about user in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * - `groups` Returns all groups, including nested groups, the user belongs to.
   * - `applicationRoles` Returns the application roles the user is assigned to.
   */
  expand: z.union([z.enum(['groups', 'applicationRoles']), z.array(z.enum(['groups', 'applicationRoles']))]).optional(),
});

export type GetCurrentUser = z.input<typeof GetCurrentUserSchema>;
