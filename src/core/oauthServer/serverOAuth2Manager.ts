import type { OnTokenRefresh } from '../oauth/types.js';
import type { OAuth2Manager } from '../oauth/oauth2Manager.js';
import { refreshServerOAuth2Token } from './helpers.js';
import { OAuthError } from '../errors/index.js';

/** Refresh this many ms before `expiresAt`, to absorb clock skew and in-flight latency. */
const EXPIRY_SKEW_MS = 60_000;

export interface ServerOAuth2ManagerOptions {
  /** The instance the tokens belong to. Also the base URL for every request, since there is no gateway. */
  host: string;
  accessToken?: string;
  refreshToken?: string;
  clientId?: string;
  clientSecret?: string;
  /** The redirect URI the incoming link was registered with. The provider validates it on refresh too. */
  redirectUri?: string;
  /** Access-token expiry as epoch milliseconds. */
  expiresAt?: number;
  onTokenRefresh?: OnTokenRefresh;
}

/**
 * Holds the OAuth 2.0 token state for one Data Center client.
 *
 * The Cloud manager's counterpart to this file spends most of its length resolving a cloud id and picking between the
 * sites a 3LO token can reach. None of that exists here: a self-hosted instance is the one site, and `getBaseUrl` hands
 * back the host it was given. What remains is the part that is genuinely shared — refresh before expiry, single
 * -flighted so N concurrent requests produce one token call, and report the rotated refresh token onwards.
 *
 * Implements the same interface as the Cloud manager so the transport keeps one code path for both.
 */
export function createServerOAuth2Manager(options: ServerOAuth2ManagerOptions): OAuth2Manager {
  const { host, clientId, clientSecret, redirectUri, onTokenRefresh } = options;

  let accessToken = options.accessToken;
  let refreshToken = options.refreshToken;
  let expiresAt = options.expiresAt;

  let refreshPromise: Promise<void> | undefined;

  const canRefresh = (): boolean =>
    refreshToken !== undefined && clientId !== undefined && clientSecret !== undefined && redirectUri !== undefined;

  const needsRefresh = (): boolean => {
    if (!canRefresh()) return false;

    if (accessToken === undefined) return true;

    if (expiresAt === undefined) return false;

    return Date.now() >= expiresAt - EXPIRY_SKEW_MS;
  };

  const doRefresh = async (): Promise<void> => {
    if (!canRefresh()) {
      throw new OAuthError(
        'Cannot refresh the OAuth 2.0 access token: `refreshToken`, `clientId`, `clientSecret` and `redirectUri` ' +
          'are required.',
      );
    }

    const response = await refreshServerOAuth2Token({
      host,
      clientId: clientId!,
      clientSecret: clientSecret!,
      refreshToken: refreshToken!,
      redirectUri: redirectUri!,
    });

    accessToken = response.accessToken;

    if (response.refreshToken) {
      refreshToken = response.refreshToken;
    }

    expiresAt = Date.now() + response.expiresIn * 1000;

    await onTokenRefresh?.({ accessToken, refreshToken, expiresAt });
  };

  const refresh = async (): Promise<void> => {
    refreshPromise ??= doRefresh();

    try {
      await refreshPromise;
    } finally {
      refreshPromise = undefined;
    }
  };

  const ensureAccessToken = async (): Promise<string> => {
    if (needsRefresh()) await refresh();

    if (accessToken === undefined) {
      throw new OAuthError(
        'No OAuth 2.0 access token is available and it cannot be refreshed. Provide an `accessToken`, or the full ' +
          'refresh credentials (`refreshToken`, `clientId`, `clientSecret`, `redirectUri`).',
      );
    }

    return accessToken;
  };

  return {
    canRefresh,

    async getAuthorizationHeader() {
      return `Bearer ${await ensureAccessToken()}`;
    },

    getBaseUrl() {
      return Promise.resolve(host);
    },

    forceRefresh: refresh,
  };
}
