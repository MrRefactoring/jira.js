import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectDataPolicySchema } from './projectDataPolicy';
/** Details about data policies for a project. */

export const ProjectWithDataPolicySchema = apiObject({
  dataPolicy: ProjectDataPolicySchema.optional(),
  /** The project ID. */
  id: z.number().optional(),
});

export type ProjectWithDataPolicy = z.infer<typeof ProjectWithDataPolicySchema>;
