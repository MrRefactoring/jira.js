import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowProjectIdScopeSchema } from './workflowProjectIdScope';
/** The scope of the workflow. */

export const WorkflowPreviewScopeSchema = apiObject({
  project: WorkflowProjectIdScopeSchema.optional(),
  /** The scope of the workflow. `GLOBAL` for company-managed projects and `PROJECT` for team-managed projects. */
  type: z.enum(['PROJECT', 'GLOBAL']).optional(),
});

export type WorkflowPreviewScope = z.infer<typeof WorkflowPreviewScopeSchema>;
