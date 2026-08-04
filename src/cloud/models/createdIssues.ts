import { z } from 'zod';
import { apiObject } from '#/core';
import { BulkOperationErrorResultSchema } from './bulkOperationErrorResult';
import { CreatedIssueSchema } from './createdIssue';
/** Details about the issues created and the errors for requests that failed. */

export const CreatedIssuesSchema = apiObject({
  /** Error details for failed issue creation requests. */
  errors: z.array(BulkOperationErrorResultSchema).optional(),
  /** Details of the issues created. */
  issues: z.array(CreatedIssueSchema).optional(),
});

export type CreatedIssues = z.infer<typeof CreatedIssuesSchema>;
