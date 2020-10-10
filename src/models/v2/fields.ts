import { IssueTypeDetails } from './issueTypeDetails';
import { Priority } from './priority';
import { StatusDetails } from './statusDetails';
import { TimeTrackingDetails } from './timeTrackingDetails';
import { UserDetails } from './userDetails';

export interface Fields {
  summary: string;
  status: StatusDetails[];
  priority: Priority[];
  assignee: UserDetails[];
  timetracking: TimeTrackingDetails[];
  issuetype: IssueTypeDetails[];
  issueType: IssueTypeDetails[];
}
