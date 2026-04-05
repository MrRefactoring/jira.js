import { z } from 'zod';

export const DeleteLinkedWorkspacesSchema = z.object({
  /**
   * Comma-separated list of Security Workspace IDs to delete. All data associated with the given workspaces will
   * eventually be removed from Jira. Example: workspaceIds=111-222-333,444-555-666.
   */
  workspaceIds: z.union([z.string(), z.array(z.string())]),
});

export type DeleteLinkedWorkspaces = z.input<typeof DeleteLinkedWorkspacesSchema>;
