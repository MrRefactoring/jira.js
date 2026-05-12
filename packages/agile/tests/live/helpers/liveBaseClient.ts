import { createClient } from '@jira.js/base';
import type { Client } from '@jira.js/base';
import type { LiveEnv } from './liveEnv';

export function createLiveBaseClient(env: LiveEnv): Client {
  return createClient({
    host: env.baseUrl,
    auth: {
      type: 'basic',
      email: env.email,
      apiToken: env.apiToken,
    },
  });
}
