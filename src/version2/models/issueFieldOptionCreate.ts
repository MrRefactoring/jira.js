import type { IssueFieldOptionConfiguration } from './issueFieldOptionConfiguration';

export interface IssueFieldOptionCreate {
  config?: IssueFieldOptionConfiguration;
  /**
   * The properties of the option as arbitrary key-value pairs. These properties can be searched using JQL, if the
   * extractions (see https://developer.atlassian.com/cloud/jira/platform/modules/issue-field-option-property-index/)
   * are defined in the descriptor for the issue field module.
   */
  properties?: unknown;
  /** The option's name, which is displayed in Jira. */
  value: string;
}
