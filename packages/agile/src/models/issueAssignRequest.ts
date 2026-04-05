import { z } from 'zod';

export const IssueAssignRequestSchema = z.object({
  issues: z.array(z.string()).optional(),
});

export type IssueAssignRequest = z.infer<typeof IssueAssignRequestSchema>;
