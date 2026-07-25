import { z } from 'zod';

export const GetWorkspacesSchema = z.object({
  /**
   * Optional Operations Workspace ID to retrieve a specific workspace. If omitted, all workspace IDs linked to the Jira
   * site are returned. Example: workspaceId=111-222-333.
   */
  workspaceId: z.string().optional(),
});

export type GetWorkspaces = z.input<typeof GetWorkspacesSchema>;
