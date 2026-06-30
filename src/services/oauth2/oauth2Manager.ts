import type { AccessibleResource, OnTokenRefresh } from './types';
import { getAccessibleResources, refreshOAuth2Token } from './helpers';

const GATEWAY_BASE = 'https://api.atlassian.com/ex/jira';
/** Refresh this many ms before `expiresAt` to absorb clock skew / in-flight latency. */
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

export class OAuth2Manager {
  private accessToken?: string;

  private refreshToken?: string;

  private expiresAt?: number;

  private cloudId?: string;

  private readonly clientId?: string;

  private readonly clientSecret?: string;

  private readonly siteUrl?: string;

  private readonly onTokenRefresh?: OnTokenRefresh;

  /** Single-flight guards: at most one in-flight refresh / cloudId resolution at a time. */
  private refreshPromise?: Promise<void>;

  private cloudIdPromise?: Promise<string>;

  constructor(options: OAuth2ManagerOptions) {
    this.accessToken = options.accessToken;
    this.refreshToken = options.refreshToken;
    this.expiresAt = options.expiresAt;
    this.cloudId = options.cloudId;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.siteUrl = options.siteUrl;
    this.onTokenRefresh = options.onTokenRefresh;
  }

  canRefresh(): boolean {
    return this.refreshToken !== undefined && this.clientId !== undefined && this.clientSecret !== undefined;
  }

  /** `Bearer <token>`, proactively refreshing if the token is missing or within the skew window of expiry. */
  async getAuthorizationHeader(): Promise<string> {
    const token = await this.ensureAccessToken();

    return `Bearer ${token}`;
  }

  /** The API-gateway base URL for the resolved cloud id (`https://api.atlassian.com/ex/jira/{cloudId}`). */
  async getBaseUrl(): Promise<string | undefined> {
    const cloudId = await this.resolveCloudId();

    return `${GATEWAY_BASE}/${cloudId}`;
  }

  /** Force a refresh regardless of expiry (used by the 401 retry path). Single-flighted. */
  async forceRefresh(): Promise<void> {
    return this.refresh();
  }

  private needsRefresh(): boolean {
    if (!this.canRefresh()) {
      return false;
    }

    if (this.accessToken === undefined) {
      return true;
    }

    if (this.expiresAt === undefined) {
      return false;
    }

    return Date.now() >= this.expiresAt - EXPIRY_SKEW_MS;
  }

  private async ensureAccessToken(): Promise<string> {
    if (this.needsRefresh()) {
      await this.refresh();
    }

    if (this.accessToken === undefined) {
      throw new Error(
        'No OAuth 2.0 access token is available and it cannot be refreshed. Provide an `accessToken` or full refresh credentials (`refreshToken`, `clientId`, `clientSecret`).',
      );
    }

    return this.accessToken;
  }

  private async refresh(): Promise<void> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.doRefresh();

    try {
      await this.refreshPromise;
    } finally {
      this.refreshPromise = undefined;
    }
  }

  private async doRefresh(): Promise<void> {
    if (!this.canRefresh()) {
      throw new Error(
        'Cannot refresh the OAuth 2.0 access token: `refreshToken`, `clientId`, and `clientSecret` are required.',
      );
    }

    const response = await refreshOAuth2Token({
      clientId: this.clientId!,
      clientSecret: this.clientSecret!,
      refreshToken: this.refreshToken!,
    });

    this.accessToken = response.accessToken;

    if (response.refreshToken) {
      this.refreshToken = response.refreshToken;
    }

    this.expiresAt = Date.now() + response.expiresIn * 1000;

    await this.onTokenRefresh?.({
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      expiresAt: this.expiresAt,
    });
  }

  private async resolveCloudId(): Promise<string> {
    if (this.cloudId !== undefined) {
      return this.cloudId;
    }

    if (this.cloudIdPromise) {
      return this.cloudIdPromise;
    }

    this.cloudIdPromise = (async () => {
      const token = await this.ensureAccessToken();
      const resources = await getAccessibleResources(token);
      const resource = this.selectResource(resources);

      this.cloudId = resource.id;

      return resource.id;
    })();

    try {
      return await this.cloudIdPromise;
    } finally {
      this.cloudIdPromise = undefined;
    }
  }

  private selectResource(resources: AccessibleResource[]): AccessibleResource {
    if (resources.length === 0) {
      throw new Error(
        'No accessible Jira resources were returned for this OAuth 2.0 token. Check the granted scopes and that the user has access to at least one Jira site.',
      );
    }

    if (this.siteUrl !== undefined) {
      const target = OAuth2Manager.normalizeUrl(this.siteUrl);
      const match = resources.find(resource => OAuth2Manager.normalizeUrl(resource.url) === target);

      if (!match) {
        throw new Error(
          `No accessible resource matches siteUrl "${this.siteUrl}". Available: ${resources.map(r => r.url).join(', ')}.`,
        );
      }

      return match;
    }

    if (resources.length > 1) {
      throw new Error(
        `Multiple accessible Jira resources found; pass \`siteUrl\` or \`cloudId\` to disambiguate. Available: ${resources.map(r => r.url).join(', ')}.`,
      );
    }

    return resources[0];
  }

  private static normalizeUrl(url: string): string {
    return url.replace(/\/+$/, '').toLowerCase();
  }
}
