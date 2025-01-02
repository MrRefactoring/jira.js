import { IssueFieldOptionScope } from './issueFieldOptionScope.mjs';

/** Details of the projects the option is available in. */
export interface IssueFieldOptionConfiguration {
  scope?: IssueFieldOptionScope;
}
