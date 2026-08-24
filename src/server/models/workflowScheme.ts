import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema } from './user';

export const WorkflowSchemeSchema = apiObject({
  defaultWorkflow: z.string().optional(),
  description: z.string().optional(),
  draft: z.boolean().optional(),
  id: z.number().optional(),
  issueTypeMappings: z.record(z.string(), z.any()).optional(),
  issueTypes: z.record(z.string(), z.any()).optional(),
  lastModified: z.string().optional(),
  lastModifiedUser: UserSchema.optional(),
  name: z.string().optional(),
  originalDefaultWorkflow: z.string().optional(),
  originalIssueTypeMappings: z.record(z.string(), z.any()).optional(),
  self: z.url().optional(),
  updateDraftIfNeeded: z.boolean().optional(),
});

export type WorkflowScheme = z.infer<typeof WorkflowSchemeSchema>;
