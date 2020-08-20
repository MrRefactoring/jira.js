import { IssueTypeScheme } from './issueTypeScheme';

export interface PageBeanIssueTypeScheme {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: IssueTypeScheme[];
}
