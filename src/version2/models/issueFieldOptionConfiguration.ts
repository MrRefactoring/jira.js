import { IssueFieldOptionScopeBean } from './issueFieldOptionScopeBean';

/** Details of the projects the option is available in. */
export interface IssueFieldOptionConfiguration {
  scope?: IssueFieldOptionScopeBean;
  /** DEPRECATED */
  attributes?: string[];
}
