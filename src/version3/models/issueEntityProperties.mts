/**
 * Lists of issues and entity properties. See [Entity
 * properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/) for more information.
 */
export interface IssueEntityProperties {
  /** A list of entity property IDs. */
  entitiesIds?: number[];
  /** A list of entity property keys and values. */
  properties?: {};
}
