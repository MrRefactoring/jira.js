import { z } from 'zod';
import { apiObject } from '#/core';
/** The result of a successful submitOperationsWorkspaces request.* */

export const SubmitOperationsWorkspacesSchema = apiObject({
  /** The IDs of Operations Workspaces that have been linked to the Jira site in this request. */
  acceptedWorkspaceIds: z.array(z.string()).optional(),
});

export type SubmitOperationsWorkspaces = z.infer<typeof SubmitOperationsWorkspacesSchema>;
