import { z } from 'zod';
import { apiObject } from '#/core';

export const IssueAssignRequestSchema = apiObject({
  issues: z.array(z.string()).optional(),
});

export type IssueAssignRequest = z.infer<typeof IssueAssignRequestSchema>;
