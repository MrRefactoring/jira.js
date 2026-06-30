/** Normalised (camelCase) response from the Atlassian token endpoint. */
export interface OAuth2TokenResponse {
  /** The new access token. */
  accessToken: string;
  /** The rotated refresh token (present when `offline_access` was requested). Persist it — the old one is now invalid. */
  refreshToken?: string;
  /** Access-token lifetime in seconds (as returned by Atlassian; typically ~3600). */
  expiresIn: number;
  /** Space-separated granted scopes. */
  scope: string;
  /** Token type, always `bearer`. */
  tokenType: string;
}

/** An entry from `GET /oauth/token/accessible-resources`. */
export interface AccessibleResource {
  /** The cloud id — use this as `cloudId`. */
  id: string;
  /** Human-readable site name. */
  name: string;
  /** Site URL, e.g. `https://your-domain.atlassian.net`. */
  url: string;
  /** Scopes the token holds on this resource. */
  scopes: string[];
  /** Site avatar URL. */
  avatarUrl: string;
}

/** Payload passed to `onTokenRefresh` after every successful refresh. */
export interface TokenRefreshEvent {
  accessToken: string;
  refreshToken?: string;
  /** Epoch milliseconds. */
  expiresAt: number;
}

export type OnTokenRefresh = (event: TokenRefreshEvent) => void | Promise<void>;
