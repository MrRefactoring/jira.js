import { z } from 'zod';

/** The payload of Operations Workspace Ids. */
export const GetWorkspacesSchema = z.object({
  /** The IDs of Operations Workspaces that are available to this Jira site. */
  workspaceIds: z.array(z.string()),
});

export type GetWorkspaces = z.infer<typeof GetWorkspacesSchema>;
