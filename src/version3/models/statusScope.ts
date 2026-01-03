import { z } from 'zod';
import { ProjectIdSchema } from './projectId';

/** The scope of the status. */
export const StatusScopeSchema = z.strictObject({
  /** The scope of the status. `GLOBAL` for company-managed projects and `PROJECT` for team-managed projects. */
  type: z.enum(['GLOBAL', 'PROJECT']),
  project: ProjectIdSchema.optional(),
});

export type StatusScope = z.infer<typeof StatusScopeSchema>;
