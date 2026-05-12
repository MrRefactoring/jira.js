import { z } from 'zod';
import { BulkOperationErrorResultSchema } from '#/models/bulkOperationErrorResult';
import { CreatedIssueSchema } from '#/models/createdIssue';

/** Details about the issues created and the errors for requests that failed. */
export const CreatedIssuesSchema = z.object({
  /** Error details for failed issue creation requests. */
  errors: z.array(BulkOperationErrorResultSchema).optional(),
  /** Details of the issues created. */
  issues: z.array(CreatedIssueSchema).optional(),
});

export type CreatedIssues = z.infer<typeof CreatedIssuesSchema>;
