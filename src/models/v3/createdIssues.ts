import { BulkOperationErrorResult } from "./bulkOperationErrorResult";
import { CreatedIssue } from "./createdIssue";

export interface CreatedIssues {
    issues: CreatedIssue[];
    errors: BulkOperationErrorResult[];
}