import { z } from 'zod';
import { apiObject } from '#/core';
/** The payload of Operations Workspace Ids. */

export const GetWorkspacesSchema = apiObject({
  /** The IDs of Operations Workspaces that are available to this Jira site. */
  workspaceIds: z.array(z.string()),
});

export type GetWorkspaces = z.infer<typeof GetWorkspacesSchema>;
