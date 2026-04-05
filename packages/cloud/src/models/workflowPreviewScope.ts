import { z } from 'zod';
import { WorkflowProjectIdScopeSchema } from '#/models/workflowProjectIdScope';

/** The scope of the workflow. */
export const WorkflowPreviewScopeSchema = z.object({
  project: WorkflowProjectIdScopeSchema.optional(),
  /** The scope of the workflow. `GLOBAL` for company-managed projects and `PROJECT` for team-managed projects. */
  type: z.enum(['PROJECT', 'GLOBAL']).optional(),
});

export type WorkflowPreviewScope = z.infer<typeof WorkflowPreviewScopeSchema>;
