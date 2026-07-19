import { z } from 'zod';

export const GetLinkedWorkspaceByIdSchema = z.object({
  /** The ID of the workspace to fetch. */
  workspaceId: z.string().max(255, 'workspaceId must be at most 255 characters'),
});

export type GetLinkedWorkspaceById = z.input<typeof GetLinkedWorkspaceByIdSchema>;
