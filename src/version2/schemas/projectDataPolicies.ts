import { z } from 'zod';
import { ProjectWithDataPolicySchema } from './projectWithDataPolicy';

/** Details about data policies for a list of projects. */
export const ProjectDataPoliciesSchema = z.object({
  /** List of projects with data policies. */
  projectDataPolicies: z.array(ProjectWithDataPolicySchema).optional(),
});

export type ProjectDataPolicies = z.infer<typeof ProjectDataPoliciesSchema>;
