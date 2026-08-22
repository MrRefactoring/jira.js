import { z } from 'zod';
import { authSchema } from './auth.js';
import type { AuthBasic, AuthBearer, AuthOAuth2, AuthOAuth2Server } from './auth.js';
import type { SchemaMismatchBehavior } from '../schemaMismatch.js';

/**
 * The shape the client calls `fetch` by.
 *
 * Narrower than `typeof globalThis.fetch` on purpose: undici's `fetch` declares its own `RequestInit` — one with
 * `dispatcher` and without `duplex` — and a proxy wrapper would not type-check against the global signature.
 *
 * @public
 */
export type FetchLike = (url: string, init: RequestInit) => Promise<Response>;

export const transientRetrySchema = z.object({
  /** Total number of attempts including the first. Default: 1 (no retries). */
  maxAttempts: z.number().int().positive().optional(),
  /** Delay before the first retry in ms. Default: 500. */
  initialDelayMs: z.number().int().nonnegative().optional(),
  /** Exponential backoff multiplier. Default: 2. */
  backoffFactor: z.number().positive().optional(),
});

export type TransientRetryConfig = z.infer<typeof transientRetrySchema>;

export const clientConfigSchema = z
  .object({
    /**
     * The bare site URL, e.g. `https://your-domain.atlassian.net` — the API path belongs to the request, not here.
     *
     * Optional only under OAuth 2.0: 3LO tokens are not accepted on the site's own domain, so the client routes through
     * `https://api.atlassian.com/ex/{product}/{cloudId}` and derives that URL itself.
     */
    host: z.url().optional(),
    auth: authSchema.optional(),
    headers: z.record(z.string(), z.string()).optional(),
    /**
     * Called once when the credentials are refused, to supply fresh ones and retry.
     *
     * Usually that is a 401. Not always: an endpoint permitting anonymous access answers `200` with an anonymous-scope
     * body and reports the refusal only in `X-Seraph-LoginReason`, and this is called there too.
     */
    getAuthOn401: z.custom<() => Promise<z.infer<typeof authSchema>>>(val => typeof val === 'function').optional(),
    /**
     * The `fetch` every request goes through, including the OAuth 2.0 token and cloud-id calls. Defaults to the global.
     *
     * The one seam the transport offers: wrap it to log, to trace, to route through a proxy, or to record fixtures.
     *
     * ```ts
     * import { fetch as undiciFetch, ProxyAgent } from 'undici';
     *
     * const dispatcher = new ProxyAgent(process.env.HTTPS_PROXY!);
     *
     * createClient({ host, auth, fetch: (url, init) => undiciFetch(url, { ...init, dispatcher }) });
     * ```
     *
     * A wrapper that logs request bodies will see `client_secret` and `refresh_token` on the token call. That is your
     * own credential passing through your own code, but it is a log file it should not reach.
     */
    fetch: z.custom<FetchLike>(val => typeof val === 'function').optional(),
    /**
     * Opt-in retry for transient transport failures only — network errors (ECONNRESET, ETIMEDOUT, ENOTFOUND, EAI_AGAIN,
     * EPIPE, UND_ERR_SOCKET, ERR_SSL_*) and HTTP 502/503/504. Never retries 4xx (including 401, 429) or 5xx other than
     * 502/503/504 — those signal client or server logic and masking them would hide real regressions. Disabled by
     * default.
     */
    retry: transientRetrySchema.optional(),
    /**
     * What to do when a response does not match its schema. Defaults to `'warn'`: report the problem once and hand back
     * the body unvalidated, rather than ending the request.
     */
    onSchemaMismatch: z
      .custom<SchemaMismatchBehavior>(
        val => typeof val === 'function' || val === 'warn' || val === 'silent' || val === 'throw',
      )
      .optional(),
  })
  .refine(data => data.host !== undefined || data.auth?.type === 'oauth2', {
    message: '`host` is required unless you authenticate with OAuth 2.0, which routes through the Atlassian gateway.',
    path: ['host'],
  });

export type ParsedClientConfig = z.infer<typeof clientConfigSchema>;

export type CommonClientConfig = Omit<ParsedClientConfig, 'host' | 'auth'>;

/**
 * The shape accepted by `createClient`, `createV1Client` and `createV2Client`.
 *
 * Written by hand rather than inferred, because `host` is required for every strategy except OAuth 2.0 and a Zod
 * refinement cannot express that in the type — only at runtime.
 */
export type ClientConfig =
  | (CommonClientConfig & { host?: string; auth: AuthOAuth2 })
  | (CommonClientConfig & { host: string; auth?: AuthBasic | AuthBearer | AuthOAuth2Server });
