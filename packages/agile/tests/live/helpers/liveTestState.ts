import { inject } from 'vitest';

export interface LiveProjectHandle {
  projectKey: string;
  projectId: string;
  accountId: string;
}

declare module 'vitest' {
  interface ProvidedContext {
    liveProject: LiveProjectHandle | null;
  }
}

export function getInjectedLiveProject(): LiveProjectHandle {
  const handle = inject('liveProject');

  if (handle == null) {
    throw new Error(
      'Live test project not provisioned. Set JIRA_BASE_URL, JIRA_EMAIL, and JIRA_API_TOKEN, then run via `pnpm test:live` so globalSetup can create the suite project.',
    );
  }

  return handle;
}
