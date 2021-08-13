import { IssueFieldOptionConfiguration } from './issueFieldOptionConfiguration';

/** @deprecated Use IssueFieldOptionCreate instead. */
export type IssueFieldOptionCreateBean = IssueFieldOptionCreate;

export interface IssueFieldOptionCreate {
  /** The option's name, which is displayed in Jira. */
  value: string;
  /**
   * The properties of the option as arbitrary key-value pairs. These properties can be searched using JQL, if the
   * extractions (see https://developer.atlassian.com/cloud/jira/platform/modules/issue-field-option-property-index/)
   * are defined in the descriptor for the issue field module.
   */
  properties?: {};
  config?: IssueFieldOptionConfiguration;
}
