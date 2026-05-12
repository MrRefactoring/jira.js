export interface LiveEnv {
  baseUrl: string;
  email: string;
  apiToken: string;
  oauthToken: string | undefined;
  /** CI run identifier for resource traceability. Set via JIRA_CI_RUN_ID or GITHUB_RUN_ID. */
  runId: string;
}

export function getLiveEnv(): LiveEnv | null {
  const baseUrl = process.env.JIRA_BASE_URL;
  const email = process.env.JIRA_EMAIL;
  const apiToken = process.env.JIRA_API_TOKEN;

  if (!baseUrl || !email || !apiToken) return null;

  return {
    baseUrl,
    email,
    apiToken,
    oauthToken: process.env.JIRA_OAUTH_TOKEN,
    runId: process.env.JIRA_CI_RUN_ID ?? process.env.GITHUB_RUN_ID ?? globalThis.crypto.randomUUID().slice(0, 8),
  };
}
