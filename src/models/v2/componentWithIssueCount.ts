import { User } from './user';

export interface ComponentWithIssueCount {
  issueCount: number;
  description: string;
  project: string;
  projectId: number;
  assignee: User[];
  self: string;
  assigneeType: string;
  lead: User[];
  realAssignee: User[];
  isAssigneeTypeValid: boolean;
  realAssigneeType: string;
  name: string;
  id: string;
}
