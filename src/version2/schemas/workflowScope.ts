import { z } from 'zod';
import { ProjectIdSchema } from './projectId';

/** The scope of the workflow. */
export const WorkflowScopeSchema = z.object({
  project: ProjectIdSchema.optional(),
  /** The scope of the workflow. `GLOBAL` for company-managed projects and `PROJECT` for team-managed projects. */
  type: z.enum(['PROJECT', 'GLOBAL']).optional(),
});

export type WorkflowScope = z.infer<typeof WorkflowScopeSchema>;
