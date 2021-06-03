/** Jira instance health check results. Deprecated and no longer returned. */
export interface HealthCheckResult {
  /** The name of the Jira health check item. */
  name?: string;
  /** The description of the Jira health check item. */
  description?: string;
  /** Whether the Jira health check item passed or failed. */
  passed?: boolean;
}
