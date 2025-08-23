import { z } from 'zod';
import { ErrorSchema } from './error';

export const ErrorsSchema = z.object({
  issueIsSubtask: ErrorSchema.optional(),
  issuesInArchivedProjects: ErrorSchema.optional(),
  issuesInUnlicensedProjects: ErrorSchema.optional(),
  issuesNotFound: ErrorSchema.optional(),
  userDoesNotHavePermission: ErrorSchema.optional(),
});

export type Errors = z.infer<typeof ErrorsSchema>;
