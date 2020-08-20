import { ComponentWithIssueCount } from './componentWithIssueCount';

export interface PageBeanComponentWithIssueCount {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: ComponentWithIssueCount[];
}
