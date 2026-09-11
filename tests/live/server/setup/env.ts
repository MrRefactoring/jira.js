export interface ServerTestEnv {
  host: string;
  username: string;
  password: string;
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
    projectKey: value('JIRA_SERVER_PROJECT_KEY', 'JJS'),
  };
}
