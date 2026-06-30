/**
 * Copy this file to `config.ts` and fill in the values:
 *
 *   cp src/config.example.ts src/config.ts
 *
 * `config.ts` is in .gitignore — your real clientId/clientSecret won't end up in git.
 */
export const config = {
  /** Client ID of the OAuth 2.0 (3LO) app from the developer console. */
  clientId: '',
  /** Client secret. Server-side only — never publish or commit it. */
  clientSecret: '',
  /**
   * Requested scopes. `offline_access` is required to receive a refresh token
   * and to see the auto-refresh in action.
   */
  scopes: ['read:jira-user', 'offline_access'],
  /**
   * Local port for the callback server. Produces a redirect_uri of the form
   * `http://localhost:<port>/callback` — register exactly this in the
   * developer console (Authorization → Callback URL).
   */
  port: 3000,
};

if (!config.clientId || !config.clientSecret) {
  throw new Error('Fill in clientId and clientSecret in src/config.ts (copy from config.example.ts).');
}
