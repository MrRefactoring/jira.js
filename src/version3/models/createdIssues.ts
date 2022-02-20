import { BulkOperationErrorResult } from './bulkOperationErrorResult';
import { CreatedIssue } from './createdIssue';

/** Details about the issues created and the errors for requests that failed. */
export interface CreatedIssues {
  /** Details of the issues created. */
  issues?: CreatedIssue[];
  /** Error details for failed issue creation requests. */
  errors?: BulkOperationErrorResult[];
}
