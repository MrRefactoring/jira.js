import { z } from 'zod';

export const SubmitOperationsWorkspacesSchema = z.object({
  /** The IDs of Operations Workspaces that are available to this Jira site. */
  workspaceIds: z.array(z.string()),
});

export type SubmitOperationsWorkspaces = z.input<typeof SubmitOperationsWorkspacesSchema>;
