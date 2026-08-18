import type { core as zodCore } from 'zod';
import { bodyToFetchBody, requiresDuplex, shouldSetJsonContentType } from './bodyToFetchBody.js';
import type { Auth, ClientConfig, SendRequestOptions } from './schemas/index.js';
import type { Client } from './interfaces/index.js';
import type { OAuth2Manager } from './oauth/index.js';
import {
  createApiError,
  isNetworkError,
  SchemaMismatchError,
  toNetworkError,
  TRANSIENT_HTTP_STATUSES,
} from './errors/index.js';
import { BlobSchema, BufferSchema } from './formData/index.js';
import { isSchemaAuditEnabled, recordSchemaDrift } from './schemaAudit.js';
import { describeIssues, reportSchemaMismatch } from './schemaMismatch.js';
import type { SchemaMismatchReport } from './schemaMismatch.js';
import { buildUrlWithSearchParams } from './serializeSearchParams.js';
import { clientConfigSchema } from './schemas/index.js';
import { createOAuth2Manager } from './oauth/index.js';

/**
 * Whether this 401 means "missing scope" rather than "stale token".
 *
 * Reads a clone, so the body stays available for the error that gets thrown later.
 */
async function isScopeMismatchResponse(response: Response): Promise<boolean> {
  try {
    return /scope does not match/i.test(await response.clone().text());
  } catch {
    return false;
  }
}

/** What an undocumented value looks like, in the vocabulary a schema would use to describe it. */
function describeValue(value: unknown): string {
  if (value === null) return 'null';

  if (Array.isArray(value)) {
    const elements = new Set(value.slice(0, 10).map(element => describeValue(element)));

    return elements.size === 0 ? 'unknown[]' : `${[...elements].sort().join(' | ')}[]`;
  }

  return typeof value;
}

/**
 * The value the API sent where the schema listed a set, as text for the report.
 *
 * Audit-only, like everything else on this path, and the value is the whole finding: an enum that grew is repaired by
 * adding the value it grew by, which a type name does not carry. Anything that is not a string is described rather than
 * quoted — a set of numbers or booleans is rare enough that naming its shape is answer enough.
 */
function describeValueAtPath(body: unknown, path: readonly PropertyKey[]): string {
  let target = body;

  for (const segment of path) {
    if (target === null || typeof target !== 'object') return 'nothing';

    target = (target as Record<PropertyKey, unknown>)[segment];
  }

  return typeof target === 'string' ? target : describeValue(target);
}

/**
 * Reads the undocumented values, then removes them so the response can be parsed a second time.
 *
 * Audit-only, and it reports the types because the point of the audit is to write the missing field into the schema —
 * which cannot be done from a list of names. Guessing `contributorIds` is an array of strings from its name alone is
 * how a schema ends up wrong in a new way.
 *
 * `path` is a zod issue path, so every segment is an object key or an array index, and anything no longer there is
 * simply skipped — the walk describes a body that was just parsed, not an arbitrary structure.
 */
function takeKeyTypes(
  body: unknown,
  path: readonly PropertyKey[],
  keys: readonly PropertyKey[],
): Record<string, string> {
  let target = body;

  for (const segment of path) {
    if (target === null || typeof target !== 'object') return {};

    target = (target as Record<PropertyKey, unknown>)[segment];
  }

  if (target === null || typeof target !== 'object') return {};

  const types: Record<string, string> = {};

  for (const key of keys) {
    types[String(key)] = describeValue((target as Record<PropertyKey, unknown>)[key]);
    delete (target as Record<PropertyKey, unknown>)[key];
  }

  return types;
}

type DriftFinding =
  | { kind: 'keys'; path: PropertyKey[]; keys: PropertyKey[] }
  | { kind: 'value'; path: PropertyKey[]; documented: string[] };

/**
 * Reads a validation failure as pure schema drift, or decides it is not.
 *
 * Audit-only. Returns the gaps when _every_ complaint is one, and `undefined` the moment anything else appears — a
 * missing field or a changed type is real breakage, and the audit must not quietly absorb it.
 *
 * Two kinds count. An undocumented key is a field the specification never described. A value outside a documented set
 * is the same gap one level down: the field is described, its list of values is not complete. Both are the vendor's
 * documentation falling behind the vendor's API, and reporting either as breakage sends the reader after a fault in the
 * wrong codebase.
 *
 * Unions need the recursion. Zod reports each branch it tried, and branches that failed for their own reasons are
 * simply the wrong branch; what identifies the right one is a branch whose only complaint is undocumented keys. Without
 * this, every union-typed response throws instead of being recorded, and the drift inside it accumulates unseen behind
 * a report that looks complete.
 *
 * Inside a union, a value outside a documented set does _not_ count. That is how zod says "wrong branch" — every
 * discriminated branch rejects the value that identifies its siblings — so counting it there would name the first
 * branch tried as a grown enum and stop the search before the branch that actually matched.
 */
function readDrift(
  issues: readonly zodCore.$ZodIssue[],
  base: PropertyKey[] = [],
  inUnion = false,
): DriftFinding[] | undefined {
  const findings: DriftFinding[] = [];

  for (const issue of issues) {
    const path = [...base, ...issue.path];

    if (issue.code === 'unrecognized_keys') {
      findings.push({ kind: 'keys', path, keys: [...issue.keys] });
      continue;
    }

    if (issue.code === 'invalid_value' && !inUnion) {
      findings.push({ kind: 'value', path, documented: issue.values.map(value => String(value)) });
      continue;
    }

    if (issue.code === 'invalid_union') {
      const branch = issue.errors
        .map(branchIssues => readDrift(branchIssues, path, true))
        .find(result => result !== undefined);

      if (branch === undefined) return undefined;

      findings.push(...branch);
      continue;
    }

    return undefined;
  }

  return findings;
}

/** A `Client` is anything with `sendRequest`; a `ClientConfig` never has one. */
function isClient(value: ClientConfig | Client): value is Client {
  return typeof (value as Client).sendRequest === 'function';
}

/**
 * Base64 for the Basic auth header, the same way in every runtime.
 *
 * `btoa` alone mangles anything outside Latin-1, so the string is encoded to UTF-8 bytes first — a credential may well
 * hold non-ASCII. Verified byte-identical to `Buffer.from(…).toString('base64')`.
 */
function base64Encode(value: string): string {
  const bytes = new TextEncoder().encode(value);

  let binary = '';

  for (const byte of bytes) binary += String.fromCharCode(byte);

  return btoa(binary);
}

async function getAuthHeaders(auth: Auth): Promise<Record<string, string>> {
  if (auth.type === 'oauth2') {
    return auth.accessToken ? { Authorization: `Bearer ${auth.accessToken}` } : {};
  }

  if (auth.type === 'basic') {
    const encoded = base64Encode(`${auth.email}:${auth.apiToken}`);

    return { Authorization: `Basic ${encoded}` };
  }

  if ('getToken' in auth) {
    const token = await auth.getToken();

    return { Authorization: `Bearer ${token}` };
  }

  return { Authorization: `Bearer ${auth.token}` };
}

/**
 * Creates a low-level Confluence API client.
 *
 * The client carries only transport, auth and retry policy — it is version agnostic, so one instance drives both
 * `confluence.js/v1` and `confluence.js/v2`.
 *
 * Prefer `createV1Client` / `createV2Client` from `confluence.js` unless you want the flat functions and a smaller
 * bundle.
 *
 * @public
 */
export function createClient(config: ClientConfig | Client): Client {
  if (isClient(config)) return config;

  clientConfigSchema.parse(config);

  const { host, auth, headers: configHeaders = {}, getAuthOn401, retry, onSchemaMismatch = 'warn' } = config;
  const retryMaxAttempts = Math.max(1, retry?.maxAttempts ?? 1);
  const retryInitialDelayMs = retry?.initialDelayMs ?? 500;
  const retryBackoffFactor = retry?.backoffFactor ?? 2;

  const oauth2Manager: OAuth2Manager | undefined = auth?.type === 'oauth2' ? createOAuth2Manager(auth) : undefined;

  return {
    async sendRequest<T>(requestConfig: SendRequestOptions<T>): Promise<T> {
      const path = requestConfig.url.startsWith('/') ? requestConfig.url : `/${requestConfig.url}`;
      const effectiveHost = oauth2Manager ? await oauth2Manager.getBaseUrl() : host;
      const normalizedHost =
        effectiveHost && (effectiveHost.endsWith('/') ? effectiveHost.slice(0, -1) : effectiveHost);
      const url = normalizedHost ? normalizedHost + path : requestConfig.url;
      const fullUrl = buildUrlWithSearchParams(url, requestConfig.searchParams);

      const rawBody = requestConfig.body;
      const body = rawBody === undefined || rawBody === null ? undefined : bodyToFetchBody(rawBody);

      const doRequest = async (authHeaders: Record<string, string>): Promise<Response> => {
        const headers: Record<string, string> = {
          Accept: 'application/json',
          ...(shouldSetJsonContentType(rawBody, requestConfig.method) ? { 'Content-Type': 'application/json' } : {}),
          ...authHeaders,
          ...configHeaders,
          ...requestConfig.headers,
        };

        const init: RequestInit & { duplex?: 'half' } = {
          method: requestConfig.method,
          headers: Object.keys(headers).length > 0 ? headers : undefined,
          body: body as BodyInit,
        };

        if (requiresDuplex(rawBody)) {
          init.duplex = 'half';
        }

        return fetch(fullUrl, init);
      };

      const currentAuthHeaders = async (): Promise<Record<string, string>> => {
        if (oauth2Manager) return { Authorization: await oauth2Manager.getAuthorizationHeader() };

        return auth ? getAuthHeaders(auth) : {};
      };

      let derivedAuthHeaders = await currentAuthHeaders();
      let response: Response;
      let delayMs = retryInitialDelayMs;
      let networkAttempt = 0;
      let reauthenticated = false;

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- intentional retry loop
      while (true) {
        try {
          response = await doRequest(derivedAuthHeaders);
        } catch (err) {
          const networkError = isNetworkError(err) ? err : toNetworkError(err, fullUrl);

          if (networkAttempt + 1 < retryMaxAttempts && networkError.transient) {
            networkAttempt += 1;
            await new Promise<void>(resolve => setTimeout(resolve, delayMs));
            delayMs = Math.round(delayMs * retryBackoffFactor);
            continue;
          }

          throw networkError;
        }

        if (response.status === 401 && !reauthenticated && !(await isScopeMismatchResponse(response))) {
          if (oauth2Manager?.canRefresh()) {
            reauthenticated = true;
            await oauth2Manager.forceRefresh();
            derivedAuthHeaders = await currentAuthHeaders();
            continue;
          }

          if (getAuthOn401) {
            reauthenticated = true;
            derivedAuthHeaders = await getAuthHeaders(await getAuthOn401());
            continue;
          }
        }

        if (TRANSIENT_HTTP_STATUSES.has(response.status) && networkAttempt + 1 < retryMaxAttempts) {
          networkAttempt += 1;
          await new Promise<void>(resolve => setTimeout(resolve, delayMs));
          delayMs = Math.round(delayMs * retryBackoffFactor);
          continue;
        }

        break;
      }

      if (!response.ok) {
        const text = await response.text();
        let detail: unknown = text;
        try {
          detail = JSON.parse(text);
        } catch {}
        throw createApiError(
          `Request failed: ${response.status} ${response.statusText}${text ? ` - ${text}` : ''}`,
          response.status,
          response.statusText,
          detail,
          response.headers,
        );
      }

      const contentType = response.headers.get('content-type');

      if (response.status === 204) return undefined as T;

      if ((requestConfig.schema as unknown) === BufferSchema) {
        return BufferSchema.parse(new Uint8Array(await response.arrayBuffer())) as T;
      }

      // A `Blob` carries the content type with the bytes, which is the whole reason these endpoints ask for one: the
      // same avatar URL answers with SVG for a system avatar and PNG for an uploaded one, and nothing in the request
      // says which is coming.
      if ((requestConfig.schema as unknown) === BlobSchema) {
        return BlobSchema.parse(await response.blob()) as T;
      }

      if (contentType && !contentType.includes('application/json')) {
        if (requestConfig.schema) {
          throw new SchemaMismatchError(`Expected a JSON response to validate against the schema, got ${contentType}`, {
            endpoint: `${requestConfig.method ?? 'GET'} ${requestConfig.url}`,
            issues: [{ path: '', expected: 'application/json', received: contentType || 'no content type' }],
          });
        }

        return undefined as T;
      }

      let data: unknown;

      if (contentType?.includes('application/json')) {
        const text = await response.text();

        try {
          data = JSON.parse(text);
        } catch (e) {
          if (e instanceof SyntaxError) {
            data = text || undefined;
          } else {
            throw e;
          }
        }
      } else {
        const text = await response.text();

        data = text || undefined;
      }

      if (requestConfig.schema && data !== undefined) {
        const parsed = requestConfig.schema.safeParse(data);

        if (!parsed.success) {
          const endpoint = `${requestConfig.method ?? 'GET'} ${requestConfig.url}`;

          const drift = isSchemaAuditEnabled() ? readDrift(parsed.error.issues) : undefined;

          if (drift) {
            for (const finding of drift) {
              if (finding.kind === 'keys') {
                recordSchemaDrift({
                  kind: 'keys',
                  endpoint,
                  path: finding.path.join('.'),
                  keys: finding.keys.map(key => String(key)),
                  types: takeKeyTypes(data, finding.path, finding.keys),
                });
                continue;
              }

              recordSchemaDrift({
                kind: 'value',
                endpoint,
                path: finding.path.join('.'),
                value: describeValueAtPath(data, finding.path),
                documented: finding.documented,
              });
            }

            // Undocumented keys are stripped as they are recorded, so the body can be validated for real once they are
            // gone. A value outside a documented set cannot be taken out the same way — removing the field would leave
            // a hole where the schema wants a value — so the response is handed back unvalidated instead. Either way
            // it reaches the caller: everything wrong with it has been recorded, and one stale schema must not cut the
            // audit short.
            const cleaned = requestConfig.schema.safeParse(data);

            return cleaned.success ? (cleaned.data as T) : (data as T);
          }

          const report: SchemaMismatchReport = { endpoint, issues: describeIssues(parsed.error.issues, data) };
          const behavior = isSchemaAuditEnabled() ? 'throw' : onSchemaMismatch;

          if (reportSchemaMismatch(behavior, report)) {
            throw new SchemaMismatchError(`Response did not match the schema for ${endpoint}`, report, {
              cause: parsed.error,
            });
          }

          return data as T;
        }

        return parsed.data as T;
      }

      return data as T;
    },
  };
}
