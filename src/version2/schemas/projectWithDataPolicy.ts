import { z } from 'zod';

/** Details about data policies for a project. */
export const ProjectWithDataPolicySchema = z.object({
  /** Data policy. */
  dataPolicy: z.unknown().optional(),
  /** The project ID. */
  id: z.number().int().optional(),
});

export type ProjectWithDataPolicy = z.infer<typeof ProjectWithDataPolicySchema>;
