import { IssueFieldOptionConfiguration } from './issueFieldOptionConfiguration.mjs';

export interface IssueFieldOptionCreate {
  config?: IssueFieldOptionConfiguration;
  /**
   * The properties of the option as arbitrary key-value pairs. These properties can be searched using Jql, if the
   * extractions (see https://developer.atlassian.com/cloud/jira/platform/modules/issue-field-option-property-index/)
   * are defined in the descriptor for the issue field module.
   */
  properties?: {};
  /** The option's name, which is displayed in Jira. */
  value: string;
}
