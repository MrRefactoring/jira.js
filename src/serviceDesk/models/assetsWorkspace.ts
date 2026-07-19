import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of an Assets workspace ID. */

export const AssetsWorkspaceSchema = apiObject({
  /** The workspace ID used as the identifier to access the Assets REST API. */
  workspaceId: z.string().optional(),
});

export type AssetsWorkspace = z.infer<typeof AssetsWorkspaceSchema>;
