import { z } from 'zod';
import { apiObject } from '#/core';
import { TimeTrackingConfigurationSchema } from './timeTrackingConfiguration';

export const ConfigurationSchema = apiObject({
  attachmentsEnabled: z.boolean().optional(),
  issueLinkingEnabled: z.boolean().optional(),
  subTasksEnabled: z.boolean().optional(),
  timeTrackingConfiguration: TimeTrackingConfigurationSchema.optional(),
  timeTrackingEnabled: z.boolean().optional(),
  unassignedIssuesAllowed: z.boolean().optional(),
  votingEnabled: z.boolean().optional(),
  watchingEnabled: z.boolean().optional(),
});

export type Configuration = z.infer<typeof ConfigurationSchema>;
