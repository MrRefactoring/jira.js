import { IssueFilterForBulkPropertySet } from "./issueFilterForBulkPropertySet";

export interface BulkIssuePropertyUpdateRequest {
    value: unknown;
    filter: IssueFilterForBulkPropertySet[];
}