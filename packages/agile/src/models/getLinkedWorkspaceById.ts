import { z } from 'zod';

/** The Security Workspace information stored for the given ID. */
export const GetLinkedWorkspaceByIdSchema = z.object({
  /** The Security Workspace ID */
  workspaceId: z.string(),
  /** Latest date and time that the Security Workspace was updated in Jira. */
  updatedAt: z.string().transform(s => new Date(s)),
});

export type GetLinkedWorkspaceById = z.infer<typeof GetLinkedWorkspaceByIdSchema>;
