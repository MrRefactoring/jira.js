import { IssueUpdateDetails } from './issueUpdateDetails';

/** @deprecated Use {@link IssuesUpdate} instead. */
export type IssuesUpdateBean = IssuesUpdate;

export interface IssuesUpdate {
  issueUpdates?: IssueUpdateDetails[];
}
