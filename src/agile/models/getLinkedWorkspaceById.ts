import { z } from 'zod';
import { apiObject } from '#/core';
/** The Security Workspace information stored for the given ID. */

export const GetLinkedWorkspaceByIdSchema = apiObject({
  /** The Security Workspace ID */
  workspaceId: z.string(),
  /** Latest date and time that the Security Workspace was updated in Jira. */
  updatedAt: z.coerce.date(),
});

export type GetLinkedWorkspaceById = z.infer<typeof GetLinkedWorkspaceByIdSchema>;
