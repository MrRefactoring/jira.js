export interface IssueTypeScheme {
    id: string;
    name: string;
    description?: string;
    defaultIssueTypeId?: string;
    isDefault?: boolean;
}
