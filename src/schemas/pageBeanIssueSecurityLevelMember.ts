import { IssueSecurityLevelMember } from './issueSecurityLevelMember';

export interface PageBeanIssueSecurityLevelMember {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: IssueSecurityLevelMember[];
}
