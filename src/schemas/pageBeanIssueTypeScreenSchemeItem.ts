import { IssueTypeScreenSchemeItem } from './issueTypeScreenSchemeItem';

export interface PageBeanIssueTypeScreenSchemeItem {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: IssueTypeScreenSchemeItem[];
}
