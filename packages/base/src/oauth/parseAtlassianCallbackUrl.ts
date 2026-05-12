export interface AtlassianCallbackParams {
  code: string;
  state: string;
}

export function parseAtlassianCallbackUrl(url: string): AtlassianCallbackParams | null {
  const parsed = new URL(url);
  const code = parsed.searchParams.get('code');
  const state = parsed.searchParams.get('state');

  if (!code || !state) {
    return null;
  }

  return { code, state };
}
