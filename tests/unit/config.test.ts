import { describe, expect, test } from 'vitest';
import { OAuth2Schema } from '@jirajs';

describe('OAuth2Schema', () => {
  test('accepts a static access token', () => {
    expect(OAuth2Schema.safeParse({ accessToken: 'a' }).success).toBe(true);
  });

  test('accepts a full refresh credential set', () => {
    expect(OAuth2Schema.safeParse({ refreshToken: 'r', clientId: 'c', clientSecret: 's' }).success).toBe(true);
  });

  test('rejects a partial refresh credential set', () => {
    expect(OAuth2Schema.safeParse({ accessToken: 'a', refreshToken: 'r', clientId: 'c' }).success).toBe(false);
  });

  test('rejects neither an access token nor refresh credentials', () => {
    expect(OAuth2Schema.safeParse({ cloudId: 'cid' }).success).toBe(false);
  });

  describe('onTokenRefresh', () => {
    test('accepts a function', () => {
      expect(OAuth2Schema.safeParse({ accessToken: 'a', onTokenRefresh: () => {} }).success).toBe(true);
    });

    test('rejects a non-function', () => {
      expect(OAuth2Schema.safeParse({ accessToken: 'a', onTokenRefresh: 'nope' }).success).toBe(false);
    });
  });
});
