import { z } from 'zod';
import { apiObject } from '#/core';
import { FieldSchema } from './field';
import { IssueTypeJsonSchema } from './issueTypeJson';
import { ProjectSchema } from './project';

export const FieldConfigSchemeSchema = apiObject({
  allIssueTypes: z.boolean().optional(),
  allProjects: z.boolean().optional(),
  defaultValue: z.record(z.string(), z.any()).optional(),
  description: z.string().optional(),
  field: FieldSchema.optional(),
  fieldConfigIds: z.array(z.number()).optional(),
  id: z.number().optional(),
  issueTypes: z.array(IssueTypeJsonSchema).optional(),
  name: z.string().optional(),
  projects: z.array(ProjectSchema).optional(),
  self: z.url().optional(),
});

export type FieldConfigScheme = z.infer<typeof FieldConfigSchemeSchema>;
