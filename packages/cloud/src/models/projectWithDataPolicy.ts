import { z } from 'zod';
import { ProjectDataPolicySchema } from '#/models/projectDataPolicy';

/** Details about data policies for a project. */
export const ProjectWithDataPolicySchema = z.object({
  dataPolicy: ProjectDataPolicySchema.optional(),
  /** The project ID. */
  id: z.number().optional(),
});

export type ProjectWithDataPolicy = z.infer<typeof ProjectWithDataPolicySchema>;
