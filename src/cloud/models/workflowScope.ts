import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ProjectIdSchema } from './projectId';
/** The scope of the workflow. */

export const WorkflowScopeSchema = apiObject({
  project: ProjectIdSchema.optional(),
  /** The scope of the workflow. `GLOBAL` for company-managed projects and `PROJECT` for team-managed projects. */
  type: openEnum(['PROJECT', 'GLOBAL']).optional(),
});

export type WorkflowScope = z.infer<typeof WorkflowScopeSchema>;
