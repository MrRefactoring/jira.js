import { createCloudClient, type CloudClient } from '@jira.js/cloud';
import { getLiveEnv, type LiveEnv } from './liveEnv';

export interface LiveCloudClient {
  client: CloudClient;
  env: LiveEnv;
}

export function createLiveCloudClient(): LiveCloudClient {
  const env = getLiveEnv();

  if (!env) {
    throw new Error(
      'Live env not configured. Set JIRA_BASE_URL, JIRA_EMAIL, and JIRA_API_TOKEN environment variables.',
    );
  }

  const client = createCloudClient({
    host: env.baseUrl,
    auth: {
      type: 'basic',
      email: env.email,
      apiToken: env.apiToken,
    },
  });

  return { client, env };
}
