import { z } from 'zod';
import { apiObject } from '#/core';
/** The payload of linked Security Workspace IDs. */

export const GetLinkedWorkspacesSchema = apiObject({
  /** The IDs of Security Workspaces that are linked to this Jira site. */
  workspaceIds: z.array(z.string()),
});

export type GetLinkedWorkspaces = z.infer<typeof GetLinkedWorkspacesSchema>;
