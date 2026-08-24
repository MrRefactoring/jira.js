/**
 * Where the Data Center suites find their instance, and how they sign in.
 *
 * Defaults match `docker/jira-dc/compose.yaml` and what `pnpm jira-dc:up` creates, so a developer who has run that one
 * command needs no `.env` at all. Every value can still be overridden, which is how the same suites can be pointed at
 * a real instance when one is available.
 */
export interface ServerTestEnv {
  host: string;
  username: string;
  password: string;
  /** A personal access token, when one is configured. The auth suite needs it; nothing else does. */
  personalAccessToken?: string;
  projectKey: string;
}

function value(name: string, fallback: string): string {
  const found = process.env[name];

  return found !== undefined && found.trim() !== '' ? found.trim() : fallback;
}

export function serverTestEnv(): ServerTestEnv {
  return {
    host: value('JIRA_SERVER_BASE_URL', 'http://localhost:8080').replace(/\/+$/, ''),
    username: value('JIRA_SERVER_USERNAME', 'admin'),
    password: value('JIRA_SERVER_PASSWORD', 'admin123'),
    personalAccessToken: process.env.JIRA_SERVER_PAT?.trim() || undefined,
    projectKey: value('JIRA_SERVER_PROJECT_KEY', 'JJS'),
  };
}
