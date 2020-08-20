import { IssueTypeSchemeMapping } from './issueTypeSchemeMapping';

export interface PageBeanIssueTypeSchemeMapping {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: IssueTypeSchemeMapping[];
}
