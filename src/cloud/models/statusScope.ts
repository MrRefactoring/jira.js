import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectIdSchema } from './projectId';
/** The scope of the status. */

export const StatusScopeSchema = apiObject({
  project: ProjectIdSchema.optional(),
  /** The scope of the status. `GLOBAL` for company-managed projects and `PROJECT` for team-managed projects. */
  type: z.enum(['PROJECT', 'GLOBAL']),
});

export type StatusScope = z.infer<typeof StatusScopeSchema>;
