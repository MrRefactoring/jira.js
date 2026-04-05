import type { AtlassianOAuthTokens } from './obtainAtlassianOAuthTokens';

const TOKEN_URL = 'https://auth.atlassian.com/oauth/token';

export interface RefreshAtlassianOAuthTokensOptions {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

export async function refreshAtlassianOAuthTokens(
  options: RefreshAtlassianOAuthTokensOptions,
): Promise<AtlassianOAuthTokens> {
  const { clientId, clientSecret, refreshToken } = options;
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Token refresh failed: ${response.status} ${text}`);
  }

  const data = (await response.json()) as {
    access_token: string;
    expires_in: number;
    scope: string;
    refresh_token?: string;
  };

  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in,
    scope: data.scope,
    refreshToken: data.refresh_token,
  };
}
