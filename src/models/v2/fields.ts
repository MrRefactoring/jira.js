import { IssueTypeDetails } from "./issueTypeDetails";
import { Priority } from "./priority";
import { StatusDetails } from "./statusDetails";
import { TimeTrackingDetails } from "./timeTrackingDetails";
import { UserDetails } from "./userDetails";

export interface Fields {
    summary: string;
    status: StatusDetails[];
    priority: Priority[];
    assignee: UserDetails[];
    timeTracking: TimeTrackingDetails[];
    issuetype: IssueTypeDetails[];
    issueType: IssueTypeDetails[];
}