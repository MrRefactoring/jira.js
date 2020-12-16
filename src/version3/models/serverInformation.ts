import { HealthCheckResult } from './healthCheckResult';

/**
 * Details about the Jira instance. */
export interface ServerInformation {
  /** The base URL of the Jira instance. */
  baseUrl?: string;
  /** The version of Jira. */
  version?: string;
  /** The major, minor, and revision version numbers of the Jira version. */
  versionNumbers?: number[];
  /** The type of server deployment. This is always returned as *Cloud*. */
  deploymentType?: string;
  /** The build number of the Jira version. */
  buildNumber?: number;
  /** The timestamp when the Jira version was built. */
  buildDate?: string;
  /** The time in Jira when this request was responded to. */
  serverTime?: string;
  /** The unique identifier of the Jira version. */
  scmInfo?: string;
  /** The name of the Jira instance. */
  serverTitle?: string;
  /** Jira instance health check results. Deprecated and no longer returned. */
  healthChecks?: HealthCheckResult[];
}
