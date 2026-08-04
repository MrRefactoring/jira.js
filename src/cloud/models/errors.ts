import type { z } from 'zod';
import { apiObject } from '#/core';
import { ErrorSchema } from './error';

export const ErrorsSchema = apiObject({
  issueIsSubtask: ErrorSchema.optional(),
  issuesInArchivedProjects: ErrorSchema.optional(),
  issuesInUnlicensedProjects: ErrorSchema.optional(),
  issuesNotFound: ErrorSchema.optional(),
  userDoesNotHavePermission: ErrorSchema.optional(),
});

export type Errors = z.infer<typeof ErrorsSchema>;
