import { IssuesJqlMetaData } from './issuesJqlMetaData';

/** @deprecated Use IssuesMeta instead. */
export type IssuesMetaBean = IssuesMeta;

/** Meta data describing the `issues` context variable. */
export interface IssuesMeta {
  jql?: IssuesJqlMetaData;
}
