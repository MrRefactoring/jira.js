import { z } from 'zod';
import type { AxiosError } from 'axios';
import type { HttpException } from './clients';
import type { OnTokenRefresh } from './services/oauth2/types';

export const BasicAuthSchema = z
  .object({
    email: z.string(),
    apiToken: z.string(),
  })
  .strict();

export type BasicAuth = z.infer<typeof BasicAuthSchema>;

export const OAuth2Schema = z
  .object({
    /** A current OAuth 2.0 access token. Optional when refresh credentials are supplied. */
    accessToken: z.string().optional(),
    /**
     * A rotating OAuth 2.0 refresh token. Atlassian returns a NEW refresh token on every refresh and
     * invalidates the previous one — persist the rotated value via `onTokenRefresh`.
     */
    refreshToken: z.string().optional(),
    /** OAuth 2.0 app client id (from the developer console). Required for token refresh. */
    clientId: z.string().optional(),
    /** OAuth 2.0 app client secret. Server-side only — never ship to a browser. Required for token refresh. */
    clientSecret: z.string().optional(),
    /** Access-token expiry as a Unix timestamp in milliseconds (e.g. `Date.now() + expiresIn * 1000`). */
    expiresAt: z.number().optional(),
    /** Atlassian cloud id. If set, skips the `accessible-resources` lookup and routes via the API gateway. */
    cloudId: z.string().optional(),
    /** Site URL (e.g. `https://your-domain.atlassian.net`) used to disambiguate which cloud id to resolve. */
    siteUrl: z.string().optional(),
    /**
     * Called after every successful token refresh with the rotated credentials. Persist these so the next
     * process start uses the latest refresh token. May be async; awaited before the request proceeds.
     */
    onTokenRefresh: z
      .custom<OnTokenRefresh>(value => typeof value === 'function', {
        message: '`onTokenRefresh` must be a function.',
      })
      .optional(),
  })
  .strict()
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

      if (!anyRefreshField) {
        return true;
      }

      return data.refreshToken !== undefined && data.clientId !== undefined && data.clientSecret !== undefined;
    },
    {
      message:
        'When using OAuth 2.0 token refresh, `refreshToken`, `clientId`, and `clientSecret` must all be provided together.',
    },
  );

export type OAuth2 = z.infer<typeof OAuth2Schema>;

export const JWTSchema = z
  .object({
    /** The key from the app descriptor. */
    issuer: z.string(),
    /** The shared secret received during the app installation handshake. */
    secret: z.string(),
    /** Token expiry time (default 3 minutes after issuing). */
    expiryTimeSeconds: z.number().optional(),
  })
  .strict();

export type JWT = z.infer<typeof JWTSchema>;

export const MiddlewaresSchema = z
  .object({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: z.optional(z.any()) as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onResponse: z.optional(z.any()) as any,
  })
  .strict();

export type Middlewares = z.infer<typeof MiddlewaresSchema>;

export const ConfigSchema = z
  .object({
    host: z.string().url().optional(),
    strictGDPR: z.boolean().optional(),
    /** Adds `'X-Atlassian-Token': 'no-check'` to each request header */
    noCheckAtlassianToken: z.boolean().optional(),
    baseRequestConfig: z.any().optional(),
    authentication: z
      .union([
        z.object({ basic: BasicAuthSchema }),
        z.object({ oauth2: OAuth2Schema }),
        z.object({ jwt: JWTSchema }),
      ])
      .optional(),
    middlewares: MiddlewaresSchema.optional(),
  })
  .strict();

export type Config = z.infer<typeof ConfigSchema>;

export type JiraError = AxiosError | HttpException;
