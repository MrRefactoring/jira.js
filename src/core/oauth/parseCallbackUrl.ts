import { OAuthError } from '../errors/index.js';

export interface ParseCallbackUrlOptions {
  /**
   * The `state` you generated for this authorization request and stored against the user's session.
   *
   * Checked before anything else. This is what stops an attacker from replaying someone else's callback into your
   * session, and it only works if the value is unguessable and bound to that one user.
   */
  expectedState: string;
}

export interface CallbackParams {
  /** The authorization code, ready for {@link exchangeAuthorizationCode}. */
  code: string;
  /** The `state` that came back, already verified against `expectedState`. */
  state: string;
}

/** Constant-time string comparison, so a mismatch leaks nothing through timing. */
function equals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let diff = 0;

  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return diff === 0;
}

/**
 * Read the authorization code out of the URL Atlassian redirected the user to.
 *
 * Handles the three ways this step goes wrong, each of which is easy to forget by hand:
 *
 * - The user declined on the consent screen, so the URL carries `error=access_denied` and no code;
 * - `state` is missing or does not match the one you issued;
 * - The URL is simply not a callback — no code, no error.
 *
 * Each throws an {@link OAuthError}; for a decline, `error` is `access_denied`, which {@link isReauthorizationRequired}
 * recognises.
 *
 * @example
 *   ```typescript
 *   const { code } = parseCallbackUrl(request.url, { expectedState: session.oauthState });
 *
 *   const tokens = await exchangeAuthorizationCode({ clientId, clientSecret, code, redirectUri });
 *   ```;
 *
 * @stable
 */
export function parseCallbackUrl(url: string | URL, options: ParseCallbackUrlOptions): CallbackParams {
  // A relative URL is what a framework request object usually gives you; the base
  // is irrelevant here, only the query matters.
  const parsed = typeof url === 'string' ? new URL(url, 'http://localhost') : url;
  const params = parsed.searchParams;

  const error = params.get('error');

  if (error) {
    const description = params.get('error_description') ?? undefined;

    throw new OAuthError(
      error === 'access_denied'
        ? `The user declined authorization${description ? `: ${description}` : '.'}`
        : `Authorization failed: ${error}${description ? ` — ${description}` : ''}`,
      // A decline here really does need another trip through consent. Flagged
      // explicitly because the same code from the token endpoint means a bad
      // client secret, where re-authorizing would loop the user for nothing.
      { error, errorDescription: description, reauthorizationRequired: error === 'access_denied' },
    );
  }

  const state = params.get('state');

  if (state === null || !equals(state, options.expectedState)) {
    throw new OAuthError(
      'The `state` in the callback does not match the one issued for this authorization request. The callback was ' +
        'not initiated by this session — discard it.',
      { error: 'invalid_state' },
    );
  }

  const code = params.get('code');

  if (!code) {
    throw new OAuthError('The callback URL carries neither an authorization code nor an error.', {
      error: 'invalid_request',
    });
  }

  return { code, state };
}
