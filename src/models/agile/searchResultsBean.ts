import { IssueBean } from "./issueBean";

export interface SearchResultsBean {
    expand: string;
    startAt: number;
    maxResults: number;
    total: number;
    issues: IssueBean[];
    warningMessages: string[];
    names: {
        [key: string]: unknown;
    };
    schema: {
        [key: string]: unknown;
    };
}