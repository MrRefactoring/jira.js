import { jsmTestEnv } from './env';

const LOOPBACK = /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])(:|\/|$)/;

export function refuseUnlessThrowaway(): void {
  const { host } = jsmTestEnv();

  if (LOOPBACK.test(host) || process.env.JSM_SERVER_ALLOW_DESTRUCTIVE === 'true') return;

  throw new Error(
    `${host} is not the throwaway rig. These suites reindex the whole Assets index, persist it to disk and restore `
      + 'every archived object in a schema by filter, none of which is scoped to the fixtures they created.\n'
      + 'Point them at the local rig, or set JSM_SERVER_ALLOW_DESTRUCTIVE=true to run them anyway.',
  );
}
