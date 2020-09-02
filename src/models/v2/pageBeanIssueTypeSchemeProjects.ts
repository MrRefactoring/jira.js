import { IssueTypeSchemeProjects } from "./issueTypeSchemeProjects";

export interface PageBeanIssueTypeSchemeProjects {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: IssueTypeSchemeProjects[];
}