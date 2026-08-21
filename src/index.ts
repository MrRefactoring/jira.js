/**
 * Jira REST API client for Node.js and browsers.
 *
 * Four surfaces, one client: the Jira Cloud platform API, the Agile (software) API, Jira Service Management, and the
 * self-hosted Data Center API. Each has its own factory, and all of them take the same bare site URL — the API path
 * belongs to the request, not to `host`:
 *
 * ```ts
 * import { createCloudClient } from 'jira.js';
 *
 * const jira = createCloudClient({
 *   host: 'https://your-domain.atlassian.net',
 *   auth: { type: 'basic', email, apiToken },
 * });
 *
 * await jira.issues.getIssue({ issueIdOrKey: 'PROJ-1' });
 * ```
 *
 * Build the client once and hand it to every factory you need — one client means one set of credentials and, under
 * OAuth 2.0, one token that refreshes in a single place:
 *
 * ```ts
 * import { createClient } from 'jira.js/core';
 * import { createAgileClient, createCloudClient } from 'jira.js';
 *
 * const client = createClient({ host, auth });
 *
 * const jira = createCloudClient(client);
 * const agile = createAgileClient(client);
 * ```
 *
 * Data Center is a separate surface rather than a mode of the Cloud one, because the two APIs are not variants of each
 * other: `/rest/api/2` against `/rest/api/3`, wiki markup against ADF, `name` and `key` against `accountId`. Only the
 * client underneath is shared.
 *
 * ```ts
 * import { createServerClient } from 'jira.js';
 *
 * const jira = createServerClient({
 *   host: 'https://jira.your-company.com',
 *   auth: { type: 'bearer', token: personalAccessToken },
 * });
 * ```
 *
 * For a smaller bundle, import the flat functions from `jira.js/cloud`, `jira.js/agile`, `jira.js/serviceDesk` or
 * `jira.js/server` and drive them with that same client.
 *
 * Those entry points also expose every request parameter and response type. They are not re-exported here: the surfaces
 * collide on a handful of names.
 */

export { createCloudClient, type CloudClient } from './cloud/createCloudClient.js';

export { createAgileClient, type AgileClient } from './agile/createAgileClient.js';

export { createServiceDeskClient, type ServiceDeskClient } from './serviceDesk/createServiceDeskClient.js';

export { createServerClient, type ServerClient } from './server/createServerClient.js';

export {
  createServiceDeskServerClient,
  type ServiceDeskServerClient,
} from './serviceDeskServer/createServiceDeskServerClient.js';

export { createAssetsServerClient, type AssetsServerClient } from './assetsServer/createAssetsServerClient.js';

export {
  ApiError,
  AuthError,
  ForbiddenError,
  NotFoundError,
  RateLimitError,
  ScopeError,
  ServerError,
  NetworkError,
  OAuthError,
  ConfigError,
  SchemaMismatchError,
  isApiError,
  isAuthError,
  isForbiddenError,
  isNotFoundError,
  isRateLimitError,
  isServerError,
  isNetworkError,
  isOAuthError,
  isConfigError,
  isSchemaMismatchError,
  isReauthorizationRequired,
  isScopeError,
} from './core/index.js';

export type { Auth, ClientConfig } from './core/index.js';

export type { SchemaMismatchBehavior, SchemaMismatchIssue, SchemaMismatchReport } from './core/index.js';

export {
  generateAuthorizationUrl,
  exchangeAuthorizationCode,
  refreshOAuth2Token,
  getAccessibleResources,
  parseCallbackUrl,
} from './core/index.js';

export type {
  OAuth2TokenResponse,
  AccessibleResource,
  TokenRefreshEvent,
  OnTokenRefresh,
  CallbackParams,
} from './core/index.js';

export {
  generateServerAuthorizationUrl,
  exchangeServerAuthorizationCode,
  refreshServerOAuth2Token,
} from './core/index.js';

export type { ServerOAuth2Scope } from './core/index.js';

export { createMultipartRequestBody, toFormDataFile } from './core/index.js';

export type { AttachmentContent, AttachmentInput, MultipartRequestBody } from './core/index.js';
