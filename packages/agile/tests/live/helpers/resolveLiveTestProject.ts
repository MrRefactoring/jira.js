import type { Client } from '@jira.js/base';
import type { LiveEnv } from './liveEnv';
import { getInjectedLiveProject } from './liveTestState';

export interface ResolvedLiveProject {
  projectKey: string;
  projectId: string;
  ownsProject: false;
}

// Historically this created a fresh Jira project per `describe`. Project creation is now
// hoisted to Vitest `globalSetup` (see `globalLiveSetup.ts`) and shared across the whole
// suite run, so this is a thin accessor over the injected handle. The unused parameters
// are kept so existing call sites compile unchanged during migration.
export async function resolveLiveTestProject(_http: Client, _env: LiveEnv): Promise<ResolvedLiveProject> {
  const handle = getInjectedLiveProject();

  return {
    projectKey: handle.projectKey,
    projectId: handle.projectId,
    ownsProject: false,
  };
}

// Retained as a no-op: project deletion is now handled by `globalLiveSetup`'s teardown.
export async function deleteOwnedLiveProject(_http: Client, _resolved: ResolvedLiveProject): Promise<void> {}
