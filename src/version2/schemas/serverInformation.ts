import { z } from 'zod';
import { HealthCheckResultSchema } from './healthCheckResult';

/** Details about the Jira instance. */
export const ServerInformationSchema = z.object({
  /** The base URL of the Jira instance. */
  baseUrl: z.string().optional(),
  /** The timestamp when the Jira version was built. */
  buildDate: z.string().datetime().optional(),
  /** The build number of the Jira version. */
  buildNumber: z.number().int().optional(),
  /** The type of server deployment. This is always returned as _Cloud_. */
  deploymentType: z.string().optional(),
  /** The display URL of the Jira instance. */
  displayUrl: z.string().optional(),
  /** The display URL of Confluence. */
  displayUrlConfluence: z.string().optional(),
  /** The display URL of the Servicedesk Help Center. */
  displayUrlServicedeskHelpCenter: z.string().optional(),
  /** Jira instance health check results. Deprecated and no longer returned. */
  healthChecks: z.array(HealthCheckResultSchema).optional(),
  /** The unique identifier of the Jira version. */
  scmInfo: z.string().optional(),
  /** The time in Jira when this request was responded to. */
  serverTime: z.string().datetime().optional(),
  /**
   * The default timezone of the Jira server. In a format known as Olson Time Zones, IANA Time Zones or TZ Database Time
   * Zones.
   */
  serverTimeZone: z.string().optional(),
  /** The name of the Jira instance. */
  serverTitle: z.string().optional(),
  /** The version of Jira. */
  version: z.string().optional(),
  /** The major, minor, and revision version numbers of the Jira version. */
  versionNumbers: z.array(z.number().int()).optional(),
});

export type ServerInformation = z.infer<typeof ServerInformationSchema>;
