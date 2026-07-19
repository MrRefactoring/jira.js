import { describe, expect, it } from 'vitest';
import { isOAuthError, isReauthorizationRequired, parseCallbackUrl } from '#/core';
import type { OAuthError } from '#/core';

const STATE = 'the-state';

describe('parseCallbackUrl', () => {
  it('returns the code when state matches', () => {
    const result = parseCallbackUrl(`https://app.example/callback?code=abc&state=${STATE}`, { expectedState: STATE });

    expect(result).toEqual({ code: 'abc', state: STATE });
  });

  it('accepts a relative URL, as frameworks hand it over', () => {
    expect(parseCallbackUrl(`/callback?code=abc&state=${STATE}`, { expectedState: STATE }).code).toBe('abc');
  });

  it('accepts a URL instance', () => {
    const url = new URL(`https://app.example/callback?code=abc&state=${STATE}`);

    expect(parseCallbackUrl(url, { expectedState: STATE }).code).toBe('abc');
  });

  it('reports a declined consent as access_denied', () => {
    const error = (() => {
      try {
        parseCallbackUrl(`/callback?error=access_denied&error_description=User+said+no&state=${STATE}`, {
          expectedState: STATE,
        });
      } catch (e) {
        return e as OAuthError;
      }
    })();

    expect(isOAuthError(error)).toBe(true);
    expect(error?.error).toBe('access_denied');
    expect(error?.errorDescription).toBe('User said no');
    // The remedy is the same as a dead refresh token: send them through consent.
    expect(isReauthorizationRequired(error)).toBe(true);
  });

  it('reports any other error code from the callback', () => {
    expect(() =>
      parseCallbackUrl(`/callback?error=invalid_scope&state=${STATE}`, { expectedState: STATE }),
    ).toThrow(/invalid_scope/);
  });

  it('rejects a mismatched state before looking at the code', () => {
    expect(() => parseCallbackUrl('/callback?code=abc&state=someone-else', { expectedState: STATE })).toThrow(
      /does not match/,
    );
  });

  it('rejects a missing state', () => {
    expect(() => parseCallbackUrl('/callback?code=abc', { expectedState: STATE })).toThrow(/does not match/);
  });

  it('rejects a callback carrying neither code nor error', () => {
    expect(() => parseCallbackUrl(`/callback?state=${STATE}`, { expectedState: STATE })).toThrow(/neither/);
  });

  it('checks the error before the state, so a decline is not reported as tampering', () => {
    // Atlassian echoes state on a decline too, but a caller that lost the session
    // should still learn the user declined rather than see a scary state warning.
    const error = (() => {
      try {
        parseCallbackUrl('/callback?error=access_denied&state=stale', { expectedState: STATE });
      } catch (e) {
        return e as OAuthError;
      }
    })();

    expect(error?.error).toBe('access_denied');
  });
});
