import { z } from 'zod';
import { apiObject } from '#/core';
import { TimeTrackingConfigurationSchema } from './timeTrackingConfiguration';
/** Details about the configuration of Jira. */

export const ConfigurationSchema = apiObject({
  /** Whether the ability to add attachments to issues is enabled. */
  attachmentsEnabled: z.boolean().optional(),
  /** Whether the ability to link issues is enabled. */
  issueLinkingEnabled: z.boolean().optional(),
  /** Whether the ability to create subtasks for issues is enabled. */
  subTasksEnabled: z.boolean().optional(),
  timeTrackingConfiguration: TimeTrackingConfigurationSchema.optional(),
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
  timeTrackingEnabled: z.boolean().optional(),
});

export type Configuration = z.infer<typeof ConfigurationSchema>;
