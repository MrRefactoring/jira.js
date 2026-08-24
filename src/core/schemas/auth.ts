import { z } from 'zod';
import type { OnTokenRefresh } from '../oauth/types.js';

/** Cloud: an Atlassian account address and an API token minted for it. */
export const authBasicApiTokenSchema = z.object({
  type: z.literal('basic'),
  email: z.string().email(),
  apiToken: z.string().min(1),
});

/**
 * Data Center: a local account name and its password.
 *
 * A separate branch rather than a loosened `email`, because the two are not interchangeable — a Cloud site rejects a
 * username, a self-hosted one has no notion of an API token, and a typo that swaps them should be a validation error
 * rather than a 401 an hour later. Personal access tokens, which Data Center has had since 8.14 and prefers, go
 * through `bearer` instead.
 */
export const authBasicPasswordSchema = z.object({
  type: z.literal('basic'),
  username: z.string().min(1),
  password: z.string().min(1),
});

export const authBasicSchema = z.union([authBasicApiTokenSchema, authBasicPasswordSchema]);

export const authBearerTokenSchema = z.object({
  type: z.literal('bearer'),
  token: z.string().min(1),
});

export const authBearerProviderSchema = z.object({
  type: z.literal('bearer'),
  getToken: z.custom<() => Promise<string>>(val => typeof val === 'function', {
    message: 'getToken must be a function',
  }),
});

export const authBearerSchema = z.union([authBearerTokenSchema, authBearerProviderSchema]);

/**
 * Atlassian OAuth 2.0 (3LO).
 *
 * Either hand over an `accessToken` and manage its lifetime yourself, or hand over the full refresh credential set and
 * let the client refresh on its own. The two refinements below encode exactly that: the second one exists because a
 * partial credential set is always a mistake — it looks configured, then fails on the first refresh.
 */
export const authOAuth2Schema = z
  .object({
    type: z.literal('oauth2'),
    accessToken: z.string().min(1).optional(),
    refreshToken: z.string().min(1).optional(),
    clientId: z.string().min(1).optional(),
    clientSecret: z.string().min(1).optional(),
    /** Access-token expiry as epoch milliseconds, e.g. `Date.now() + expiresIn * 1000`. */
    expiresAt: z.number().optional(),
    /** Atlassian cloud id. When set, the `accessible-resources` lookup is skipped. */
    cloudId: z.string().min(1).optional(),
    /** Site URL, e.g. `https://your-domain.atlassian.net`, used to pick a cloud id when the token can reach several. */
    siteUrl: z.string().min(1).optional(),
    /** Called after every refresh. Persist the rotated `refreshToken` here — the previous one is dead. */
    onTokenRefresh: z
      .custom<OnTokenRefresh>(val => typeof val === 'function', { message: 'onTokenRefresh must be a function' })
      .optional(),
  })
  .refine(
    data =>
      data.accessToken !== undefined ||
      (data.refreshToken !== undefined && data.clientId !== undefined && data.clientSecret !== undefined),
    {
      message:
        'OAuth 2.0 requires either an `accessToken` or a full refresh credential set (`refreshToken`, `clientId`, `clientSecret`).',
    },
  )
  .refine(
    data => {
      const anyRefreshField =
        data.refreshToken !== undefined || data.clientId !== undefined || data.clientSecret !== undefined;

      if (!anyRefreshField) return true;

      return data.refreshToken !== undefined && data.clientId !== undefined && data.clientSecret !== undefined;
    },
    {
      message:
        'When using OAuth 2.0 token refresh, `refreshToken`, `clientId` and `clientSecret` must all be provided together.',
    },
  );

/**
 * OAuth 2.0 against a Data Center instance's own provider.
 *
 * A separate strategy from `oauth2` rather than a flag on it, because the two differ in what they talk to. Cloud 3LO
 * tokens are minted by `auth.atlassian.com` and accepted only through the Atlassian gateway, so `host` is derived from
 * a cloud id; a Data Center instance is its own authorization server and its own API host, so `host` is required and
 * is the only address involved. Folding them together would mean one strategy where `host` is both forbidden and
 * mandatory.
 *
 * `redirectUri` sits with the refresh credentials because the Data Center provider validates it on the refresh grant,
 * not only on the initial exchange.
 */
export const authOAuth2ServerSchema = z
  .object({
    type: z.literal('oauth2Server'),
    accessToken: z.string().min(1).optional(),
    refreshToken: z.string().min(1).optional(),
    clientId: z.string().min(1).optional(),
    clientSecret: z.string().min(1).optional(),
    /** The redirect URI the incoming application link was registered with. */
    redirectUri: z.string().min(1).optional(),
    /** Access-token expiry as epoch milliseconds, e.g. `Date.now() + expiresIn * 1000`. */
    expiresAt: z.number().optional(),
    /** Called after every refresh. Persist the rotated `refreshToken` here — the previous one is dead. */
    onTokenRefresh: z
      .custom<OnTokenRefresh>(val => typeof val === 'function', { message: 'onTokenRefresh must be a function' })
      .optional(),
  })
  .refine(
    data =>
      data.accessToken !== undefined
      || (data.refreshToken !== undefined
        && data.clientId !== undefined
        && data.clientSecret !== undefined
        && data.redirectUri !== undefined),
    {
      message:
        'Data Center OAuth 2.0 requires either an `accessToken` or a full refresh credential set (`refreshToken`, '
        + '`clientId`, `clientSecret`, `redirectUri`).',
    },
  )
  .refine(
    data => {
      const anyRefreshField =
        data.refreshToken !== undefined
        || data.clientId !== undefined
        || data.clientSecret !== undefined
        || data.redirectUri !== undefined;

      if (!anyRefreshField) return true;

      return (
        data.refreshToken !== undefined
        && data.clientId !== undefined
        && data.clientSecret !== undefined
        && data.redirectUri !== undefined
      );
    },
    {
      message:
        'When using Data Center OAuth 2.0 token refresh, `refreshToken`, `clientId`, `clientSecret` and '
        + '`redirectUri` must all be provided together.',
    },
  );

export const authSchema = z.union([authBasicSchema, authBearerSchema, authOAuth2Schema, authOAuth2ServerSchema]);

export type AuthBasicApiToken = z.infer<typeof authBasicApiTokenSchema>;

export type AuthBasicPassword = z.infer<typeof authBasicPasswordSchema>;

export type AuthBasic = z.infer<typeof authBasicSchema>;

export type AuthOAuth2 = z.infer<typeof authOAuth2Schema>;

export type AuthOAuth2Server = z.infer<typeof authOAuth2ServerSchema>;

export type AuthBearerToken = z.infer<typeof authBearerTokenSchema>;

export type AuthBearerProvider = z.infer<typeof authBearerProviderSchema>;

export type AuthBearer = z.infer<typeof authBearerSchema>;

export type Auth = z.infer<typeof authSchema>;
