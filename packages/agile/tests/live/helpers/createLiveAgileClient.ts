import { AgileClient, createAgileClient } from '../../../src/createAgileClient';
import { getLiveEnv, type LiveEnv } from './liveEnv';

export interface LiveAgileClient {
  client: AgileClient;
  env: LiveEnv;
}

export function createLiveAgileClient(): LiveAgileClient {
  const env = getLiveEnv();

  if (!env) {
    throw new Error(
      'Live env not configured. Set JIRA_BASE_URL, JIRA_EMAIL, and JIRA_API_TOKEN environment variables.',
    );
  }

  const client = createAgileClient({
    host: env.baseUrl,
    auth: {
      type: 'basic',
      email: env.email,
      apiToken: env.apiToken,
    },
  });

  return { client, env };
}
