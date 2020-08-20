import { IssueTypeDetails } from './issueTypeDetails';
import { Priority } from './priority';
import { StatusDetails } from './statusDetails';
import { UserDetails } from './userDetails';

export interface Fields {
    summary: string;
    status: StatusDetails[];
    priority: Priority[];
    assignee: UserDetails[];
    issuetype: IssueTypeDetails[];
    issueType: IssueTypeDetails[];
}
