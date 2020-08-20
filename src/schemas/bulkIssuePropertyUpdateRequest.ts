import { IssueFilterForBulkPropertySet } from './issueFilterForBulkPropertySet';

export interface BulkIssuePropertyUpdateRequest {
    value: any;
    filter: IssueFilterForBulkPropertySet[];
}
