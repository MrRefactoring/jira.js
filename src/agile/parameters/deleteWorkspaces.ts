import { z } from 'zod';

export const DeleteWorkspacesSchema = z.object({
  /**
   * Comma-separated list of Operations Workspace IDs to delete. All data associated with the given workspaces will
   * eventually be removed from Jira. Example: workspaceIds=111-222-333,444-555-666.
   */
  workspaceIds: z.union([z.string(), z.array(z.string())]),
});

export type DeleteWorkspaces = z.input<typeof DeleteWorkspacesSchema>;
