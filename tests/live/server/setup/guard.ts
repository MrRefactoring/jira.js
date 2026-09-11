import { serverTestEnv } from './env';

const LOOPBACK = /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])(:|\/|$)/;

export function refuseUnlessThrowaway(): void {
  const { host } = serverTestEnv();

  if (LOOPBACK.test(host) || process.env.JIRA_SERVER_ALLOW_DESTRUCTIVE === 'true') return;

  throw new Error(
    `${host} is not the throwaway rig. These suites create a project, anonymise a user, rename the signed-in `
      + 'administrator and end by putting Jira into read-only mode, which the Data Center API offers no way out of.\n'
      + 'Point them at the local rig, or set JIRA_SERVER_ALLOW_DESTRUCTIVE=true to run them anyway.',
  );
}
