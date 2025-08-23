import { z } from 'zod';

/** Details about data policy. */
export const WorkspaceDataPolicySchema = z.object({
  /** Whether the workspace contains any content inaccessible to the requesting application. */
  anyContentBlocked: z.boolean().optional(),
});

export type WorkspaceDataPolicy = z.infer<typeof WorkspaceDataPolicySchema>;
