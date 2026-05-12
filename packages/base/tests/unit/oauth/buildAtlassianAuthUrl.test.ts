import { describe, expect, it } from 'vitest';
import { buildAtlassianAuthUrl } from '../../../src/oauth/buildAtlassianAuthUrl';

describe('buildAtlassianAuthUrl', () => {
  it('constructs the Atlassian authorize URL from options', () => {
    const url = buildAtlassianAuthUrl({
      clientId: 'client-123',
      redirectUri: 'http://localhost:8080/callback',
      scope: 'read:jira-user offline_access',
      state: 'state-abc',
    });

    const parsed = new URL(url);

    expect(parsed.origin).toBe('https://auth.atlassian.com');
    expect(parsed.pathname).toBe('/authorize');
    expect(parsed.searchParams.get('client_id')).toBe('client-123');
    expect(parsed.searchParams.get('redirect_uri')).toBe('http://localhost:8080/callback');
    expect(parsed.searchParams.get('scope')).toBe('read:jira-user offline_access');
    expect(parsed.searchParams.get('state')).toBe('state-abc');
    expect(parsed.searchParams.get('response_type')).toBe('code');
    expect(parsed.searchParams.get('prompt')).toBe('consent');
  });

  it('URL-encodes special characters in the scope', () => {
    const url = buildAtlassianAuthUrl({
      clientId: 'x',
      redirectUri: 'http://localhost/cb',
      scope: 'a b c',
      state: 's',
    });

    expect(url).toContain('scope=a+b+c');
  });

  it('URL-encodes special characters in the redirect URI', () => {
    const url = buildAtlassianAuthUrl({
      clientId: 'x',
      redirectUri: 'http://localhost/cb?foo=bar',
      scope: 's',
      state: 's',
    });

    expect(url).toContain('redirect_uri=http%3A%2F%2Flocalhost%2Fcb%3Ffoo%3Dbar');
  });

  it('is deterministic for identical inputs', () => {
    const input = {
      clientId: 'c',
      redirectUri: 'http://localhost/cb',
      scope: 'a',
      state: 's',
    };

    expect(buildAtlassianAuthUrl(input)).toBe(buildAtlassianAuthUrl(input));
  });
});
