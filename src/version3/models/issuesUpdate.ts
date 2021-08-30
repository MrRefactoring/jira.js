import { IssueUpdateDetails } from './issueUpdateDetails';

/** @deprecated Use IssuesUpdate instead. */
export type IssuesUpdateBean = IssuesUpdate;

export interface IssuesUpdate {
  issueUpdates?: IssueUpdateDetails[];
}
