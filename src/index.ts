/**
 * Jira REST API client for Node.js and browsers.
 *
 * Nine surfaces, one client. On Cloud: the Jira platform API, the Agile (software) API, Jira Service Management,
 * Assets and Teams, and three more addressed to an organization rather than to a site. Self-hosted: the Data Center
 * platform, Agile included. Each has its own factory, and the site-level ones take the same bare site URL — the API
 * path belongs to the request, not to `host`:
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
 * Data Center is a separate surface rather than a mode of the Cloud one, because the two APIs are not variants of
 * each other: `/rest/api/2` against `/rest/api/3`, wiki markup against ADF, `name` and `key` against `accountId`.
 * Only the client underneath is shared. It publishes its platform and agile endpoints as one document, so unlike
 * Cloud there is no separate agile factory — boards and sprints sit in the same client as issues.
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
 * Those entry points also expose every response type. The request parameter types sit one level down —
 * `jira.js/cloud/parameters` and so on — because a parameter and a model occasionally share a name, and forty-one
 * of them do in the Agile surface alone. Neither is re-exported here: the surfaces collide on a handful of names.
 *
 * One subpath goes the other way. `jira.js/webhooks` has no client and nothing to call: it types the events, payloads
 * and headers Jira posts to a server of yours when something happens on the site.
 */

export { createCloudClient, type CloudClient } from './cloud/createCloudClient.js';

export { createServerClient, type ServerClient } from './server/createServerClient.js';

export { createTeamsClient, type TeamsClient, type TeamsClientConfig } from './teams/createTeamsClient.js';

export { createAdminClient, type AdminClient, type AdminClientConfig } from './admin/createAdminClient.js';

export {
  createUserManagementClient,
  type UserManagementClient,
  type UserManagementClientConfig,
} from './userManagement/createUserManagementClient.js';

export {
  createUserProvisioningClient,
  type UserProvisioningClient,
  type UserProvisioningClientConfig,
} from './userProvisioning/createUserProvisioningClient.js';

export {
  createAssetsClient,
  type AssetsClient,
  type AssetsClientConfig,
} from './assets/createAssetsClient.js';

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
