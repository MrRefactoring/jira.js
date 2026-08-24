import { createClient } from './createClient.js';
import { ConfigError, NotFoundError, createApiError } from './errors/index.js';
import type { Client } from './interfaces/index.js';
import type { ClientConfig, RequestOptions } from './schemas/index.js';

/**
 * The identifiers Atlassian's platform APIs address a site by.
 *
 * A site has three names, and which one an API wants depends on the API. `cloudId` addresses the site itself and is
 * what `https://api.atlassian.com/ex/jira/{cloudId}` is built from. `orgId` addresses the organization the site
 * belongs to, which is a level above it — several sites can share one — and is what the Teams API takes. `hostName`
 * is the site URL without its scheme.
 *
 * @public
 */
export interface TenantContext {
  /** Addresses the site. One per site. */
  cloudId: string;
  /** Addresses the organization the site belongs to. Shared by every site in it. */
  orgId: string;
  /** The site's host, e.g. `your-domain.atlassian.net`. */
  hostName: string;
}

const TENANT_CONTEXT_QUERY = 'query TenantContext($hostNames: [String!]!) '
  + '{ tenantContexts(hostNames: $hostNames) { cloudId orgId hostName } }';

interface TenantContextFailure {
  message?: string;
  extensions?: { statusCode?: number };
}

interface TenantContextResponse {
  data?: { tenantContexts?: TenantContext[] | null } | null;
  errors?: TenantContextFailure[];
}

/**
 * Resolves the site's `cloudId`, `orgId` and host name.
 *
 * Atlassian publishes no REST endpoint for these — the GraphQL gateway is the documented way to ask, and an API token
 * is one of the auth categories it accepts. One request, through the client you already built, so it inherits its
 * proxy, retry policy and custom `fetch`.
 *
 * ```ts
 * import { createClient, getTenantContext } from 'jira.js/core';
 *
 * const client = createClient({ host: 'https://your-domain.atlassian.net', auth });
 * const { orgId } = await getTenantContext(client);
 * ```
 *
 * Cloud only, and not under OAuth 2.0 (3LO): the gateway lives on the site's own host, which a 3LO client does not
 * have. A Data Center host does not serve it at all.
 *
 * @public
 */
export async function getTenantContext(
  config: ClientConfig | Client,
  options?: RequestOptions,
): Promise<TenantContext> {
  const client = createClient(config);

  if (!client.host) {
    throw new ConfigError(
      'getTenantContext needs the site it is asking about, and this client carries no host. Under OAuth 2.0 (3LO) '
      + 'the base URL is derived per request and there is nothing to ask about; pass a client configured with an '
      + 'explicit `host` instead.',
    );
  }

  const response = await client.sendRequest<TenantContextResponse>({
    url: '/gateway/api/graphql',
    method: 'POST',
    body: {
      operationName: 'TenantContext',
      query: TENANT_CONTEXT_QUERY,
      variables: { hostNames: [new URL(client.host).hostname] },
    },
    signal: options?.signal,
  });

  // Annotated rather than inferred: indexing an array is not checked, and the empty answer this branch exists for
  // would otherwise read as impossible.
  const context: TenantContext | undefined = response.data?.tenantContexts?.[0];

  if (context) return context;

  // The gateway answers 200 and reports the failure in the body, so the transport has already let this through as a
  // success. The real status rides in `extensions`.
  const failure = response.errors?.[0];

  if (failure) {
    throw createApiError(
      `Could not resolve the tenant context: ${failure.message ?? 'the GraphQL gateway reported an error'}`,
      failure.extensions?.statusCode ?? 502,
      'Bad Gateway',
      response.errors,
    );
  }

  throw new NotFoundError(
    `Could not resolve the tenant context: Atlassian does not know the site ${client.host}.`,
    'Not Found',
    response,
  );
}
