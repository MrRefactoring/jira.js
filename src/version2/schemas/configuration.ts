import { z } from 'zod';

/** Details about the configuration of Jira. */
export const ConfigurationSchema = z.object({
  /** Whether the ability to add attachments to issues is enabled. */
  attachmentsEnabled: z.boolean().optional(),
  /** Whether the ability to link issues is enabled. */
  issueLinkingEnabled: z.boolean().optional(),
  /** Whether the ability to create subtasks for issues is enabled. */
  subTasksEnabled: z.boolean().optional(),
  /** The configuration of time tracking. */
  timeTrackingConfiguration: z.unknown().optional(),
  /** Whether the ability to track time is enabled. This property is deprecated. */
  timeTrackingEnabled: z.boolean().optional(),
  /**
   * Whether the ability to create unassigned issues is enabled. See [Configuring Jira application
   * options](https://confluence.atlassian.com/x/uYXKM) for details.
   */
  unassignedIssuesAllowed: z.boolean().optional(),
  /**
   * Whether the ability for users to vote on issues is enabled. See [Configuring Jira application
   * options](https://confluence.atlassian.com/x/uYXKM) for details.
   */
  votingEnabled: z.boolean().optional(),
  /**
   * Whether the ability for users to watch issues is enabled. See [Configuring Jira application
   * options](https://confluence.atlassian.com/x/uYXKM) for details.
   */
  watchingEnabled: z.boolean().optional(),
});

export type Configuration = z.infer<typeof ConfigurationSchema>;
