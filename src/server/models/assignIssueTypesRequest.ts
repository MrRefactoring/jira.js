import { z } from 'zod';
import { apiObject } from '#/core';

export const AssignIssueTypesRequestSchema = apiObject({
  issueTypes: z.array(z.string()).optional(),
  name: z.string().optional(),
  valid: z.boolean().optional(),
});

export type AssignIssueTypesRequest = z.infer<typeof AssignIssueTypesRequestSchema>;
