import { z } from 'zod';

/** Jira instance health check results. Deprecated and no longer returned. */
export const HealthCheckResultSchema = z.object({
  /** The description of the Jira health check item. */
  description: z.string().optional(),
  /** The name of the Jira health check item. */
  name: z.string().optional(),
  /** Whether the Jira health check item passed or failed. */
  passed: z.boolean().optional(),
});

export type HealthCheckResult = z.infer<typeof HealthCheckResultSchema>;
