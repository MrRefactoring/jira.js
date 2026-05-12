import { z } from 'zod';

/** Details about data policy. */
export const ProjectDataPolicySchema = z.object({
  /** Whether the project contains any content inaccessible to the requesting application. */
  anyContentBlocked: z.boolean().optional(),
});

export type ProjectDataPolicy = z.infer<typeof ProjectDataPolicySchema>;
