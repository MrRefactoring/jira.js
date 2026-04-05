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
  rawDeploymentType: string | undefined;
  isCloud: boolean;
  isServer: boolean;
  isDataCenter: boolean;
}

/**
 * Detects the Jira deployment topology by calling `/rest/api/2/serverInfo`.
 *
 * The Agile REST API (`/rest/agile/1.0`) behaves differently on Cloud vs Server:
 * - Sprint report endpoints are Cloud-only
 * - Board configuration has divergent field sets
 * - Backlog management is Cloud-only in certain configurations
 * Calling this before running agile live tests enables topology-aware skipping.
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
    // Unreachable or locked-down instance — return unknown.
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

export function requiresCloud(topology: TopologyInfo): boolean {
  return !topology.isCloud;
}
