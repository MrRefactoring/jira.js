import type { OAuth2TokenResponse } from '../oauth/types.js';
import { OAuthError } from '../errors/index.js';

/**
 * Data Center is its own authorization server.
 *
 * Nothing here goes near `auth.atlassian.com` or `api.atlassian.com`: a self-hosted instance issues its own tokens on
 * its own domain, so every call takes the site as an argument. There is no cloud id and no gateway, which is why this
 * cannot be a parameter on the Cloud helpers — the two flows differ in what they talk to, not in how.
 */
const AUTHORIZE_PATH = '/rest/oauth2/latest/authorize';
const TOKEN_PATH = '/rest/oauth2/latest/token';

/**
 * The four access levels a Data Center incoming link can grant. Each implies the ones above it: `WRITE` includes
 * `READ`, `ADMIN` includes both, and `SYSTEM_ADMIN` includes all three.
 */
export type ServerOAuth2Scope = 'READ' | 'WRITE' | 'ADMIN' | 'SYSTEM_ADMIN';

interface RawTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

function normalizeHost(host: string): string {
  return host.endsWith('/') ? host.slice(0, -1) : host;
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
async function requestToken(url: string, form: Record<string, string>): Promise<OAuth2TokenResponse> {
  let response: Response;

  try {
    // Form-encoded rather than JSON, unlike the Cloud helpers: this endpoint is a Java servlet reading request
    // parameters, and a form body keeps the client secret out of the URL that proxies and access logs record.
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body: new URLSearchParams(form).toString(),
    });
  } catch (err) {
    throw new OAuthError(`Request to ${url} failed before a response arrived`, { cause: err });
  }

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    let body: unknown = text;

    try {
      body = JSON.parse(text);
    } catch {}

    throw new OAuthError(
      `Request to ${url} failed with status ${response.status} ${response.statusText}${text ? `: ${text}` : ''}`,
      { status: response.status, body },
    );
  }

  return mapTokenResponse((await response.json()) as RawTokenResponse);
}

/**
 * Build the URL to send the user to so they can grant access to a Data Center instance.
 *
 * `state` is yours to generate and to verify when the callback comes back — it is what stops CSRF on the redirect.
 *
 * The `clientId` and `redirectUri` are the ones an administrator registered as an incoming application link; a
 * `redirectUri` that does not match the registration is rejected by the instance rather than by this function.
 *
 * @public
 */
export function generateServerAuthorizationUrl(params: {
  host: string;
  clientId: string;
  scopes: ServerOAuth2Scope[];
  redirectUri: string;
  state: string;
}): string {
  const query = new URLSearchParams({
    client_id: params.clientId,
    scope: params.scopes.join(' '),
    redirect_uri: params.redirectUri,
    state: params.state,
    response_type: 'code',
  });

  return `${normalizeHost(params.host)}${AUTHORIZE_PATH}?${query.toString()}`;
}

/**
 * Exchange the authorization `code` from the redirect callback for tokens.
 *
 * @public
 */
export async function exchangeServerAuthorizationCode(params: {
  host: string;
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
}): Promise<OAuth2TokenResponse> {
  return requestToken(`${normalizeHost(params.host)}${TOKEN_PATH}`, {
    grant_type: 'authorization_code',
    client_id: params.clientId,
    client_secret: params.clientSecret,
    code: params.code,
    redirect_uri: params.redirectUri,
  });
}

/**
 * Refresh an access token against a Data Center instance.
 *
 * `redirectUri` is required here where the specification does not ask for it: the Data Center provider validates it on
 * the refresh grant as well, and omitting it earns an `invalid_grant` that names nothing.
 *
 * @public
 */
export async function refreshServerOAuth2Token(params: {
  host: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  redirectUri: string;
}): Promise<OAuth2TokenResponse> {
  return requestToken(`${normalizeHost(params.host)}${TOKEN_PATH}`, {
    grant_type: 'refresh_token',
    client_id: params.clientId,
    client_secret: params.clientSecret,
    refresh_token: params.refreshToken,
    redirect_uri: params.redirectUri,
  });
}
