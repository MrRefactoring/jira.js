const AUTHORIZE_URL = 'https://auth.atlassian.com/authorize';

export interface BuildAtlassianAuthUrlOptions {
  clientId: string;
  redirectUri: string;
  scope: string;
  state: string;
}

export function buildAtlassianAuthUrl(options: BuildAtlassianAuthUrlOptions): string {
  const { clientId, redirectUri, scope, state } = options;
  const params = new URLSearchParams({
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    state,
    response_type: 'code',
    prompt: 'consent',
  });

  return `${AUTHORIZE_URL}?${params.toString()}`;
}
