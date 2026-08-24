import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueTypeJsonSchema } from './issueTypeJson';

export const IssueTypeSchemeSchema = apiObject({
  defaultIssueType: IssueTypeJsonSchema.optional(),
  description: z.string().optional(),
  expand: z.string().optional(),
  id: z.string().optional(),
  issueTypes: z.array(IssueTypeJsonSchema).optional(),
  name: z.string().optional(),
  self: z.string().optional(),
});

export type IssueTypeScheme = z.infer<typeof IssueTypeSchemeSchema>;
