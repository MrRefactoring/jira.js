import { z } from 'zod';
import { apiObject } from '#/core';
/** Details about data policy. */

export const WorkspaceDataPolicySchema = apiObject({
  /** Whether the workspace contains any content inaccessible to the requesting application. */
  anyContentBlocked: z.boolean().optional(),
});

export type WorkspaceDataPolicy = z.infer<typeof WorkspaceDataPolicySchema>;
