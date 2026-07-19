import type { AccessibleResource, OAuth2TokenResponse } from './types.js';
import { OAuthError } from '../errors/index.js';

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

/** `fetch` does not reject on a non-2xx status, so the status is checked here and turned into an `OAuthError`. */
async function requestJson<T>(url: string, init: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url, init);
  } catch (err) {
    throw new OAuthError(`Request to ${url} failed before a response arrived`, { cause: err });
  }

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    let body: unknown = text;

    try {
      body = JSON.parse(text);
    } catch {
      //
    }

    throw new OAuthError(
      `Request to ${url} failed with status ${response.status} ${response.statusText}${text ? `: ${text}` : ''}`,
      { status: response.status, body },
    );
  }

  return response.json() as Promise<T>;
}

/**
 * Build the URL to send the user to so they can grant access.
 *
 * `state` is yours to generate and to verify when the callback comes back — it is what stops CSRF on the redirect.
 *
 * @stable
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

/**
 * Exchange the authorization `code` from the redirect callback for tokens.
 *
 * @stable
 */
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
 * Refresh an access token.
 *
 * Atlassian rotates the refresh token on every call: persist the one you get back and drop the old one, or the next
 * refresh fails.
 *
 * @stable
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

/**
 * List the Confluence sites this access token can reach. The `id` of an entry is its cloud id.
 *
 * @stable
 */
export async function getAccessibleResources(accessToken: string): Promise<AccessibleResource[]> {
  return requestJson<AccessibleResource[]>(ACCESSIBLE_RESOURCES_URL, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' },
  });
}
