import { z } from 'zod';
import { authSchema } from './auth.js';
import type { AuthBasic, AuthBearer, AuthOAuth2 } from './auth.js';

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
     * `https://api.atlassian.com/ex/confluence/{cloudId}` and derives that URL itself.
     */
    host: z.url().optional(),
    auth: authSchema.optional(),
    headers: z.record(z.string(), z.string()).optional(),
    getAuthOn401: z.custom<() => Promise<z.infer<typeof authSchema>>>(val => typeof val === 'function').optional(),
    /**
     * Opt-in retry for transient transport failures only — network errors (ECONNRESET, ETIMEDOUT, ENOTFOUND, EAI_AGAIN,
     * EPIPE, UND_ERR_SOCKET, ERR_SSL_*) and HTTP 502/503/504. Never retries 4xx (including 401, 429) or 5xx other than
     * 502/503/504 — those signal client or server logic and masking them would hide real regressions. Disabled by
     * default.
     */
    retry: transientRetrySchema.optional(),
  })
  .refine(data => data.host !== undefined || data.auth?.type === 'oauth2', {
    message: '`host` is required unless you authenticate with OAuth 2.0, which routes through the Atlassian gateway.',
    path: ['host'],
  });

type ParsedClientConfig = z.infer<typeof clientConfigSchema>;

type CommonClientConfig = Omit<ParsedClientConfig, 'host' | 'auth'>;

/**
 * The shape accepted by `createClient`, `createV1Client` and `createV2Client`.
 *
 * Written by hand rather than inferred, because `host` is required for every strategy except OAuth 2.0 and a Zod
 * refinement cannot express that in the type — only at runtime.
 */
export type ClientConfig =
  | (CommonClientConfig & { host?: string; auth: AuthOAuth2 })
  | (CommonClientConfig & { host: string; auth?: AuthBasic | AuthBearer });
