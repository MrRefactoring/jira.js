import type { AccessibleResource, OnTokenRefresh } from './types.js';
import { getAccessibleResources, refreshOAuth2Token } from './helpers.js';
import { isOAuthError, OAuthError } from '../errors/index.js';
import { PRODUCT } from '../productInfo.js';

/** 3LO tokens are only accepted through the gateway, never on the site's own domain. */
const GATEWAY_BASE = `https://api.atlassian.com/ex/${PRODUCT.gatewaySlug}`;
/** Refresh this many ms before `expiresAt`, to absorb clock skew and in-flight latency. */
const EXPIRY_SKEW_MS = 60_000;

export interface OAuth2ManagerOptions {
  accessToken?: string;
  refreshToken?: string;
  clientId?: string;
  clientSecret?: string;
  expiresAt?: number;
  cloudId?: string;
  siteUrl?: string;
  onTokenRefresh?: OnTokenRefresh;
}

export interface OAuth2Manager {
  /** Whether a refresh is even possible — needs all three of `refreshToken`, `clientId`, `clientSecret`. */
  canRefresh(): boolean;
  /** `Bearer <token>`, refreshing first if the token is missing or within the skew window of expiry. */
  getAuthorizationHeader(): Promise<string>;
  /** The gateway base URL for the resolved cloud id. */
  getBaseUrl(): Promise<string>;
  /** Refresh regardless of expiry. Used by the 401 retry path. */
  forceRefresh(): Promise<void>;
}

function normalizeUrl(url: string): string {
  return url.replace(/\/+$/, '').toLowerCase();
}

/**
 * Holds the OAuth 2.0 token state for one client: refreshes before expiry, resolves the cloud id once, and reports
 * rotated refresh tokens through `onTokenRefresh`.
 *
 * Both the refresh and the cloud-id lookup are single-flighted, so N concurrent requests hitting an expired token
 * produce one token call, not N.
 */
export function createOAuth2Manager(options: OAuth2ManagerOptions): OAuth2Manager {
  const { clientId, clientSecret, siteUrl, onTokenRefresh } = options;

  let accessToken = options.accessToken;
  let refreshToken = options.refreshToken;
  let expiresAt = options.expiresAt;
  let cloudId = options.cloudId;

  let refreshPromise: Promise<void> | undefined;
  let cloudIdPromise: Promise<string> | undefined;

  const canRefresh = (): boolean => refreshToken !== undefined && clientId !== undefined && clientSecret !== undefined;

  const needsRefresh = (): boolean => {
    if (!canRefresh()) return false;

    if (accessToken === undefined) return true;

    // No expiry known means no basis to act on — wait for a 401 rather than
    // refreshing a token that may be perfectly good.
    if (expiresAt === undefined) return false;

    return Date.now() >= expiresAt - EXPIRY_SKEW_MS;
  };

  const doRefresh = async (): Promise<void> => {
    if (!canRefresh()) {
      throw new OAuthError(
        'Cannot refresh the OAuth 2.0 access token: `refreshToken`, `clientId` and `clientSecret` are required.',
      );
    }

    const response = await refreshOAuth2Token({
      clientId: clientId!,
      clientSecret: clientSecret!,
      refreshToken: refreshToken!,
    });

    accessToken = response.accessToken;

    if (response.refreshToken) {
      refreshToken = response.refreshToken;
    }

    expiresAt = Date.now() + response.expiresIn * 1000;

    // Awaited, so a caller persisting the rotated token has finished before the
    // request that triggered the refresh goes out.
    await onTokenRefresh?.({ accessToken, refreshToken, expiresAt });
  };

  const refresh = async (): Promise<void> => {
    // Cleared in `finally`, so a failed refresh does not poison later attempts.
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
          'refresh credentials (`refreshToken`, `clientId`, `clientSecret`).',
      );
    }

    return accessToken;
  };

  /**
   * The sites this token can reach, refreshing once if the token turns out to be stale.
   *
   * This lookup runs before the request loop, so the client's own 401-and-retry never covers it. Without this, a token
   * whose expiry is unknown — the shape you get when a caller supplies `accessToken` without `expiresAt` — would fail
   * the cloud-id lookup permanently instead of refreshing the way any other request would.
   */
  const listResources = async (): Promise<AccessibleResource[]> => {
    try {
      return await getAccessibleResources(await ensureAccessToken());
    } catch (err) {
      if (!isOAuthError(err) || err.status !== 401 || !canRefresh()) throw err;

      await refresh();

      return getAccessibleResources(await ensureAccessToken());
    }
  };

  const selectResource = (resources: AccessibleResource[]): AccessibleResource => {
    if (resources.length === 0) {
      throw new OAuthError(
        'No accessible Confluence resources were returned for this OAuth 2.0 token. Check the granted scopes and ' +
          'that the user has access to at least one Confluence site.',
      );
    }

    if (siteUrl !== undefined) {
      const target = normalizeUrl(siteUrl);
      const match = resources.find(resource => normalizeUrl(resource.url) === target);

      if (!match) {
        throw new OAuthError(
          `No accessible resource matches siteUrl "${siteUrl}". Available: ${resources.map(r => r.url).join(', ')}.`,
        );
      }

      return match;
    }

    if (resources.length > 1) {
      throw new OAuthError(
        'Multiple accessible Confluence resources found; pass `cloudId` or `siteUrl` to disambiguate. Available: ' +
          `${resources.map(r => r.url).join(', ')}.`,
      );
    }

    return resources[0];
  };

  const resolveCloudId = async (): Promise<string> => {
    if (cloudId !== undefined) return cloudId;

    cloudIdPromise ??= (async () => {
      const resources = await listResources();

      cloudId = selectResource(resources).id;

      return cloudId;
    })();

    try {
      return await cloudIdPromise;
    } finally {
      cloudIdPromise = undefined;
    }
  };

  return {
    canRefresh,

    async getAuthorizationHeader() {
      return `Bearer ${await ensureAccessToken()}`;
    },

    async getBaseUrl() {
      return `${GATEWAY_BASE}/${await resolveCloudId()}`;
    },

    forceRefresh: refresh,
  };
}
