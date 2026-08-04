/** Normalised (camelCase) response from the Atlassian token endpoint. */
export interface OAuth2TokenResponse {
  accessToken: string;
  /**
   * The rotated refresh token, present when `offline_access` was requested. Persist it — Atlassian invalidates the one
   * you sent.
   */
  refreshToken?: string;
  /** Access-token lifetime in seconds, as returned by Atlassian. Typically 3600. */
  expiresIn: number;
  /** Space-separated granted scopes. */
  scope: string;
  /** Always `bearer`. */
  tokenType: string;
}

/** An entry from `GET /oauth/token/accessible-resources`. */
export interface AccessibleResource {
  /** The cloud id — this is what `cloudId` expects. */
  id: string;
  name: string;
  /** Site URL, e.g. `https://your-domain.atlassian.net`. */
  url: string;
  scopes: string[];
  avatarUrl: string;
}

/** Payload handed to `onTokenRefresh` after every successful refresh. */
export interface TokenRefreshEvent {
  accessToken: string;
  refreshToken?: string;
  /** Epoch milliseconds. */
  expiresAt: number;
}

export type OnTokenRefresh = (event: TokenRefreshEvent) => void | Promise<void>;
