import { IssueUpdateDetails } from '../models';

export interface CreateIssue extends IssueUpdateDetails {
  /** Whether the project in which the issue is created is added to the user's **Recently viewed** project list, as shown under **Projects** in Jira. */
  updateHistory?: boolean;
}
