/**
 * Jira REST API client for Node.js and browsers.
 *
 * Three surfaces, one client: the Jira Cloud platform API, the Agile (software) API, and Jira Service Management. Each
 * has its own factory, and all of them take the same bare site URL — the API path belongs to the request, not to
 * `host`:
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
 * For a smaller bundle, import the flat functions from `jira.js/cloud`, `jira.js/agile` or `jira.js/serviceDesk` and
 * drive them with that same client.
 *
 * Those entry points also expose every response type. The request parameter types sit one level down —
 * `jira.js/cloud/parameters` and so on — because a parameter and a model occasionally share a name, and forty-one
 * of them do in the Agile surface alone. Neither is re-exported here: the surfaces collide on a handful of names.
 */

export { createCloudClient, type CloudClient } from './cloud/createCloudClient.js';

export { createAgileClient, type AgileClient } from './agile/createAgileClient.js';

export { createServiceDeskClient, type ServiceDeskClient } from './serviceDesk/createServiceDeskClient.js';

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

export { createMultipartRequestBody, toFormDataFile } from './core/index.js';

export type { AttachmentContent, AttachmentInput, MultipartRequestBody } from './core/index.js';
