import { IssueTypeScreenScheme } from "./issueTypeScreenScheme";

export interface PageBeanIssueTypeScreenScheme {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: IssueTypeScreenScheme[];
}