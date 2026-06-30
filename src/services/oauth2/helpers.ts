import type { AccessibleResource, OAuth2TokenResponse } from './types';

const AUTHORIZE_URL = 'https://auth.atlassian.com/authorize';
const TOKEN_URL = 'https://auth.atlassian.com/oauth/token';
const ACCESSIBLE_RESOURCES_URL = 'https://api.atlassian.com/oauth/token/accessible-resources';
const DEFAULT_AUDIENCE = 'api.atlassian.com';
const JSON_HEADERS = { 'Content-Type': 'application/json', Accept: 'application/json' };

interface RawTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

function mapTokenResponse(data: RawTokenResponse): OAuth2TokenResponse {
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
    scope: data.scope,
    tokenType: data.token_type,
  };
}

/**
 * Issue a request with the native `fetch` and return the parsed JSON body. Unlike axios, `fetch` does
 * not reject on a non-2xx status, so the status is checked explicitly and a descriptive error is thrown.
 */
async function requestJson<T>(url: string, init: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    const body = await response.text().catch(() => '');

    throw new Error(
      `Request to ${url} failed with status ${response.status} ${response.statusText}${body ? `: ${body}` : ''}`,
    );
  }

  return response.json() as Promise<T>;
}

/**
 * Build the Atlassian 3LO authorization URL to redirect the user to. Include `offline_access` in `scopes`
 * to receive a refresh token.
 */
export function generateAuthorizationUrl(params: {
  clientId: string;
  scopes: string[];
  redirectUri: string;
  state: string;
  prompt?: string;
  audience?: string;
}): string {
  const query = new URLSearchParams({
    audience: params.audience ?? DEFAULT_AUDIENCE,
    client_id: params.clientId,
    scope: params.scopes.join(' '),
    redirect_uri: params.redirectUri,
    state: params.state,
    response_type: 'code',
    prompt: params.prompt ?? 'consent',
  });

  return `${AUTHORIZE_URL}?${query.toString()}`;
}

/** Exchange an authorization `code` (from the redirect callback) for tokens. */
export async function exchangeAuthorizationCode(params: {
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
}): Promise<OAuth2TokenResponse> {
  const data = await requestJson<RawTokenResponse>(TOKEN_URL, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: params.clientId,
      client_secret: params.clientSecret,
      code: params.code,
      redirect_uri: params.redirectUri,
    }),
  });

  return mapTokenResponse(data);
}

/**
 * Refresh an access token. Atlassian rotates the refresh token on every call — persist the returned
 * `refreshToken` and discard the old one.
 */
export async function refreshOAuth2Token(params: {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}): Promise<OAuth2TokenResponse> {
  const data = await requestJson<RawTokenResponse>(TOKEN_URL, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify({
      grant_type: 'refresh_token',
      client_id: params.clientId,
      client_secret: params.clientSecret,
      refresh_token: params.refreshToken,
    }),
  });

  return mapTokenResponse(data);
}

/** List the Jira sites the access token can reach. The `id` of each entry is its cloud id. */
export async function getAccessibleResources(accessToken: string): Promise<AccessibleResource[]> {
  return requestJson<AccessibleResource[]>(ACCESSIBLE_RESOURCES_URL, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' },
  });
}
