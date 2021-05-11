import { TimeTrackingConfiguration } from './timeTrackingConfiguration';

/**
 * Details about the configuration of Jira. */
export interface Configuration {
  /** Whether the ability for users to vote on issues is enabled. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for details. */
  votingEnabled?: boolean;
  /** Whether the ability for users to watch issues is enabled. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for details. */
  watchingEnabled?: boolean;
  /** Whether the ability to create unassigned issues is enabled. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for details. */
  unassignedIssuesAllowed?: boolean;
  /** Whether the ability to create subtasks for issues is enabled. */
  subTasksEnabled?: boolean;
  /** Whether the ability to link issues is enabled. */
  issueLinkingEnabled?: boolean;
  /** Whether the ability to track time is enabled. This property is deprecated. */
  timeTrackingEnabled?: boolean;
  /** Whether the ability to add attachments to issues is enabled. */
  attachmentsEnabled?: boolean;
  timeTrackingConfiguration?: TimeTrackingConfiguration;
}
