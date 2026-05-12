import type { Client } from '@jira.js/base';
import { z } from 'zod';

const ServerInfoSchema = z.object({
  baseUrl: z.string().optional(),
  version: z.string().optional(),
  versionNumbers: z.array(z.number()).optional(),
  deploymentType: z.string().optional(),
  buildNumber: z.number().optional(),
  serverTitle: z.string().optional(),
});

export type JiraDeploymentType = 'cloud' | 'server' | 'datacenter' | 'unknown';

export interface TopologyInfo {
  deploymentType: JiraDeploymentType;
  version: string | undefined;
  versionNumbers: number[] | undefined;
  /** Raw `deploymentType` string returned by the API, e.g. "Cloud", "Server", "DataCenter". */
  rawDeploymentType: string | undefined;
  isCloud: boolean;
  isServer: boolean;
  isDataCenter: boolean;
}

/**
 * Detects the Jira deployment topology by calling `/rest/api/2/serverInfo`.
 *
 * This is needed because several live tests use Cloud-only APIs (Jira Cloud REST
 * API v3, Forge, Connect) that do not exist on Server or Data Center. Calling this
 * at the start of a test suite allows graceful skip rather than a hard 404 failure.
 */
export async function detectTopology(http: Client): Promise<TopologyInfo> {
  let raw: z.infer<typeof ServerInfoSchema> | null = null;

  try {
    raw = await http.sendRequest({
      url: '/rest/api/2/serverInfo',
      method: 'GET',
      schema: ServerInfoSchema,
    });
  } catch {
    // Unreachable or heavily locked-down instance — return unknown rather than throw.
  }

  const rawDeploymentType = raw?.deploymentType;

  let deploymentType: JiraDeploymentType = 'unknown';

  if (rawDeploymentType) {
    const normalized = rawDeploymentType.toLowerCase();
    if (normalized === 'cloud') deploymentType = 'cloud';
    else if (normalized === 'server') deploymentType = 'server';
    else if (normalized === 'datacenter') deploymentType = 'datacenter';
  }

  return {
    deploymentType,
    version: raw?.version,
    versionNumbers: raw?.versionNumbers,
    rawDeploymentType,
    isCloud: deploymentType === 'cloud',
    isServer: deploymentType === 'server',
    isDataCenter: deploymentType === 'datacenter',
  };
}

/**
 * Returns a `test.skipIf` predicate that skips a test when the topology is NOT Cloud.
 *
 * Usage:
 * ```ts
 * const skipIfNotCloud = makeCloudOnlyGuard(topology);
 * skipIfNotCloud.it('cloud-only test', async () => { ... });
 * ```
 */
export function requiresCloud(topology: TopologyInfo): boolean {
  return !topology.isCloud;
}
