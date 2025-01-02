/**
 * An issue ID with entity property values. See [Entity
 * properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/) for more information.
 */
export interface IssueEntityPropertiesForMultiUpdate {
  /** The ID of the issue. */
  issueID?: number;
  /** Entity properties to set on the issue. The maximum length of an issue property value is 32768 characters. */
  properties?: {};
}
