import { z } from 'zod';

/** The result of a successful submitOperationsWorkspaces request.* */
export const SubmitOperationsWorkspacesSchema = z.object({
  /** The IDs of Operations Workspaces that have been linked to the Jira site in this request. */
  acceptedWorkspaceIds: z.array(z.string()).optional(),
});

export type SubmitOperationsWorkspaces = z.infer<typeof SubmitOperationsWorkspacesSchema>;
