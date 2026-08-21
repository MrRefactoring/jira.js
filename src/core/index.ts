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
  type ApiErrorOptions,
  type RateLimitErrorOptions,
  type OAuthErrorOptions,
} from './errors/index.js';

export { apiObject } from './apiObject.js';

export { openEnum } from './openEnum.js';

export { createClient } from './createClient.js';

export type { Client } from './interfaces/index.js';

export {
  httpMethodSchema,
  clientConfigSchema,
  authSchema,
  authOAuth2Schema,
  sendRequestOptionsSchema,
  type HttpMethod,
  type ClientConfig,
  type Auth,
  type AuthBasic,
  type AuthBearer,
  type AuthOAuth2,
  type AuthOAuth2Server,
  type SendRequestOptions,
} from './schemas/index.js';

export {
  generateAuthorizationUrl,
  exchangeAuthorizationCode,
  refreshOAuth2Token,
  getAccessibleResources,
  parseCallbackUrl,
  createOAuth2Manager,
} from './oauth/index.js';

export {
  generateServerAuthorizationUrl,
  exchangeServerAuthorizationCode,
  refreshServerOAuth2Token,
  createServerOAuth2Manager,
} from './oauthServer/index.js';

export type { ServerOAuth2Scope, ServerOAuth2ManagerOptions } from './oauthServer/index.js';

export type {
  CallbackParams,
  ParseCallbackUrlOptions,
  OAuth2Manager,
  OAuth2ManagerOptions,
  OAuth2TokenResponse,
  AccessibleResource,
  TokenRefreshEvent,
  OnTokenRefresh,
} from './oauth/index.js';

export { BlobSchema, BufferSchema, createMultipartRequestBody, toFormDataFile, mimeTypeFor } from './formData/index.js';

export type { AttachmentContent, AttachmentInput, Buffer, MultipartRequestBody } from './formData/index.js';

export { withRetry } from './withRetry.js';

export type { RetryOptions } from './withRetry.js';

export { resetSchemaMismatchReporting } from './schemaMismatch.js';

export type { SchemaMismatchBehavior, SchemaMismatchIssue, SchemaMismatchReport } from './schemaMismatch.js';
