export {
  ApiError,
  AuthError,
  ForbiddenError,
  NotFoundError,
  RateLimitError,
  ScopeError,
  ServerError,
  type ApiErrorOptions,
  type RateLimitErrorOptions,
} from './apiError.js';

export { NetworkError } from './networkError.js';

export { OAuthError, ConfigError, type OAuthErrorOptions } from './oauthError.js';

export { SchemaMismatchError } from './schemaMismatchError.js';

export {
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
} from './predicates.js';

export {
  createApiError,
  toNetworkError,
  parseRetryAfter,
  isTransientCode,
  TRANSIENT_HTTP_STATUSES,
} from './fromResponse.js';

export { ERROR_KINDS, hasErrorKind, type ErrorKind } from './kinds.js';
