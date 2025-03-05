import type { BulkOperationErrorResult } from './bulkOperationErrorResult';
import type { CreatedIssue } from './createdIssue';

/** Details about the issues created and the errors for requests that failed. */
export interface CreatedIssues {
  /** Error details for failed issue creation requests. */
  errors?: BulkOperationErrorResult[];
  /** Details of the issues created. */
  issues?: CreatedIssue[];
}
