import { IssueEntityPropertiesForMultiUpdate } from './issueEntityPropertiesForMultiUpdate';

/**
 * A list of issues and their respective properties to set or update. See [Entity
 * properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/) for more information.
 */
export interface MultiIssueEntityProperties {
  /** A list of issue IDs and their respective properties. */
  issues?: IssueEntityPropertiesForMultiUpdate[];
}
