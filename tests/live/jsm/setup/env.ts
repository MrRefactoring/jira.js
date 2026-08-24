/**
 * Where the Service Management suites find their instance, and how they sign in.
 *
 * Defaults match `docker/jsm-dc/compose.yaml` and what `pnpm jsm-dc:up` creates, so a developer who has run that one
 * command needs no `.env` at all. Every value can still be overridden, which is how the same suites can be pointed at
 * a real instance when one is available.
 */
export interface JsmTestEnv {
  host: string;
  username: string;
  password: string;
  projectKey: string;
}

function value(name: string, fallback: string): string {
  const found = process.env[name];

  return found !== undefined && found.trim() !== '' ? found.trim() : fallback;
}

export function jsmTestEnv(): JsmTestEnv {
  return {
    host: value('JSM_SERVER_BASE_URL', 'http://localhost:8081').replace(/\/+$/, ''),
    username: value('JSM_SERVER_USERNAME', 'admin'),
    password: value('JSM_SERVER_PASSWORD', 'admin123'),
    projectKey: value('JSM_SERVER_PROJECT_KEY', 'JJSM'),
  };
}
