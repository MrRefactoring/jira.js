import { z } from 'zod';
import type { OnTokenRefresh } from '../oauth/types.js';

export const authBasicSchema = z.object({
  type: z.literal('basic'),
  email: z.string().email(),
  apiToken: z.string().min(1),
});

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

export const authSchema = z.union([authBasicSchema, authBearerSchema, authOAuth2Schema]);

export type AuthBasic = z.infer<typeof authBasicSchema>;

export type AuthOAuth2 = z.infer<typeof authOAuth2Schema>;

export type AuthBearerToken = z.infer<typeof authBearerTokenSchema>;

export type AuthBearerProvider = z.infer<typeof authBearerProviderSchema>;

export type AuthBearer = z.infer<typeof authBearerSchema>;

export type Auth = z.infer<typeof authSchema>;
