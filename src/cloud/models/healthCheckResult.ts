import { z } from 'zod';
import { apiObject } from '#/core';
/** Jira instance health check results. Deprecated and no longer returned. */

export const HealthCheckResultSchema = apiObject({
  /** The description of the Jira health check item. */
  description: z.string().optional(),
  /** The name of the Jira health check item. */
  name: z.string().optional(),
  /** Whether the Jira health check item passed or failed. */
  passed: z.boolean().optional(),
});

export type HealthCheckResult = z.infer<typeof HealthCheckResultSchema>;
