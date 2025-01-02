import type { IssueFieldOptionScope } from './issueFieldOptionScope.js';

/** Details of the projects the option is available in. */
export interface IssueFieldOptionConfiguration {
  scope?: IssueFieldOptionScope;
}
