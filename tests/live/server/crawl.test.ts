/**
 * Calls every readable Data Center endpoint and reports where the response does not match its schema.
 *
 * This is the main instrument for the `server` surface, and it exists because the Data Center document is generated
 * from Java annotations rather than written: it is far less accurate than the Cloud one, and the inaccuracies are
 * spread thin across four hundred operations rather than concentrated where a hand-written test would look. Two
 * hundred GETs answered by a real instance find more in one run than a month of hand-written assertions.
 *
 * What counts as a failure is only a schema mismatch. An endpoint answering 404 or 403 is Jira telling the truth about
 * this instance — there is no cluster on a single node, no index snapshot on a fresh install — and treating that as
 * breakage would drown the signal the crawl exists to produce.
 *
 * The set of endpoints is read out of the generated functions themselves rather than kept in a list here. Each one
 * declares its method and its URL as literals, so `Function.prototype.toString` yields both, and the crawl cannot
 * drift out of step with what the library actually ships.
 */
import { beforeAll, describe, expect, inject, it } from 'vitest';
import * as api from '#/server/api';
import { createClient, type Client, type SchemaMismatchReport } from '#/core';
import { serverTestEnv } from './setup/env';
import { FIXTURE } from './setup/fixtures';

interface Endpoint {
  name: string;
  method: string;
  url: string;
  /** Path placeholders the function interpolates, in the order they appear. */
  pathParameters: string[];
  call: (client: Client, parameters?: Record<string, unknown>) => Promise<unknown>;
}

function readEndpoints(): Endpoint[] {
  const endpoints: Endpoint[] = [];

  for (const [name, value] of Object.entries(api as Record<string, unknown>)) {
    if (typeof value !== 'function') continue;

    const source = value.toString();
    // Either quote style: the test runner's transform rewrites the generated single quotes to double ones.
    const method = /method:\s*['"]([A-Z]+)['"]/.exec(source)?.[1];
    const url = /url:\s*['"`]([^'"`]+)['"`]/.exec(source)?.[1];

    // Every generated operation writes both as literals. A miss means the build pipeline started transforming them,
    // and a crawl that silently skipped those endpoints would look like a clean run.
    expect(method, `no method literal in ${name}`).toBeDefined();
    expect(url, `no url literal in ${name}`).toBeDefined();

    endpoints.push({
      name,
      method: method!,
      url: url!,
      pathParameters: [...url!.matchAll(/\$\{parameters\.([A-Za-z0-9_]+)\}/g)].map(match => match[1]),
      call: value as Endpoint['call'],
    });
  }

  return endpoints;
}

/**
 * Where each path parameter's value comes from, named endpoint by endpoint.
 *
 * A parameter name alone does not identify what it wants. Seventeen different resources spell their identifier `id`,
 * and `schemeId` means a permission scheme under one path and an issue type scheme under another — feeding one value
 * to both reaches neither, it only earns two 404s that read like the endpoints are unsupported. `scope` is the URL
 * prefix an entry applies to, and the longest match wins.
 *
 * `from` names a generated function rather than a URL, so the table breaks visibly when an endpoint is renamed
 * instead of quietly narrowing what the crawl reaches.
 */
interface Source {
  from: string;
  parameter: string;
  field?: string;
  scope?: string;
}

const SOURCES: Source[] = [
  { from: 'getAllBoards', parameter: 'boardId' },
  { from: 'getAllSprints', parameter: 'sprintId' },
  { from: 'getEpics', parameter: 'epicIdOrKey', field: 'key' },
  { from: 'getEpics', parameter: 'epicId' },
  { from: 'getComments', parameter: 'commentId' },
  { from: 'getCustomFields', parameter: 'customFieldId' },
  { from: 'list', parameter: 'dashboardId' },
  { from: 'list', parameter: 'id', scope: '/rest/api/2/dashboard' },
  { from: 'getIssueAllTypes', parameter: 'issueTypeId' },
  { from: 'getIssueAllTypes', parameter: 'issueType' },
  { from: 'getIssueAllTypes', parameter: 'id', scope: '/rest/api/2/issuetype' },
  { from: 'getIssueLinkTypes', parameter: 'issueLinkTypeId' },
  { from: 'getPermissionSchemes', parameter: 'permissionSchemeId' },
  { from: 'getPermissionSchemes', parameter: 'schemeId', scope: '/rest/api/2/permissionscheme' },
  { from: 'getAllIssueTypeSchemes', parameter: 'schemeId', scope: '/rest/api/2/issuetypescheme' },
  { from: 'getPermissionSchemeGrants', parameter: 'permissionId', scope: '/rest/api/2/permissionscheme' },
  { from: 'getSharePermissions', parameter: 'permissionId', scope: '/rest/api/2/filter' },
  { from: 'getAllScreens', parameter: 'screenId' },
  { from: 'getAllTabs', parameter: 'tabId' },
  { from: 'getRemoteIssueLinks', parameter: 'linkId', scope: '/rest/api/2/issue' },
  { from: 'getAllTerminologyEntries', parameter: 'originalName', field: 'originalName' },
  { from: 'getStatusCategories', parameter: 'idOrKey' },
  { from: 'getStatuses', parameter: 'idOrName' },
  { from: 'getFavouriteFilters', parameter: 'id', scope: '/rest/api/2/filter' },
  { from: 'getPaginatedComponents', parameter: 'id', scope: '/rest/api/2/component' },
  { from: 'getIssueSecuritySchemes', parameter: 'id', scope: '/rest/api/2/issuesecurityschemes' },
  { from: 'getNotificationSchemes', parameter: 'id', scope: '/rest/api/2/notificationscheme' },
  { from: 'getPriorities', parameter: 'id', scope: '/rest/api/2/priority' },
  { from: 'getAllProjectCategories', parameter: 'id', scope: '/rest/api/2/projectCategory' },
  { from: 'getResolutions', parameter: 'id', scope: '/rest/api/2/resolution' },
  { from: 'getAllProjectRoles', parameter: 'id', scope: '/rest/api/2/role' },
  { from: 'getAll', parameter: 'key', field: 'key', scope: '/rest/api/2/applicationrole' },
  { from: 'getPrioritySchemes', parameter: 'schemeId', scope: '/rest/api/2/priorityschemes' },
];

const mismatches: SchemaMismatchReport[] = [];

/** Named after what it collects: every schema complaint from every call in the run, for one report at the end. */
function crawlClient(): Client {
  const { host, username, password } = serverTestEnv();

  return createClient({
    host,
    auth: { type: 'basic', username, password },
    onSchemaMismatch: report => void mismatches.push(report),
  });
}

const GLOBAL = '*';

/** Values by parameter name and by the URL prefix they are good for, `*` meaning anywhere. */
const values = new Map<string, unknown>();

const at = (scope: string, parameter: string): string => `${scope} ${parameter}`;

function remember(parameter: string, value: unknown, scope: string = GLOBAL): void {
  if (value === undefined || value === null) return;

  const key = at(scope, parameter);

  if (!values.has(key)) values.set(key, value);
}

/** The most specific value for this parameter on this URL: a matching scope beats a shorter one beats the global one. */
function resolve(url: string, parameter: string): unknown {
  let best: { scope: string; value: unknown } | undefined;

  for (const [key, value] of values) {
    const [scope, name] = key.split(' ');

    if (name !== parameter) continue;

    if (scope !== GLOBAL && !url.startsWith(scope)) continue;

    const better = !best || (scope !== GLOBAL && (best.scope === GLOBAL || scope.length > best.scope.length));

    if (better) best = { scope, value };
  }

  return best?.value;
}

/**
 * The first list in a response, whatever the endpoint calls it.
 *
 * Data Center wraps its collections under a dozen different names — `values`, `issues`, `comments`, `links`,
 * `permissionSchemes` — and naming each one here would be a table that has to be kept in step with the API for no
 * gain. What every one of them has in common is being the only array in the body.
 */
function firstList(body: unknown): Array<Record<string, unknown>> | undefined {
  if (Array.isArray(body)) return body as Array<Record<string, unknown>>;

  if (typeof body !== 'object' || body === null) return undefined;

  for (const value of Object.values(body)) {
    if (Array.isArray(value) && value.length > 0) return value as Array<Record<string, unknown>>;
  }

  return undefined;
}

function harvest(endpointName: string, body: unknown): void {
  const first = firstList(body)?.[0];

  if (!first) return;

  for (const source of SOURCES) {
    if (source.from !== endpointName) continue;

    remember(source.parameter, first[source.field ?? 'id'], source.scope);
  }
}

interface Outcome {
  name: string;
  url: string;
  status: 'ok' | 'refused' | 'error';
  detail?: string;
}

let endpoints: Endpoint[];
let client: Client;

beforeAll(() => {
  const fixtures = inject('serverFixtures');
  const { projectKey } = serverTestEnv();

  endpoints = readEndpoints();
  client = crawlClient();

  for (const name of ['projectIdOrKey', 'projectKeyOrId', 'projectKey']) remember(name, projectKey);
  for (const name of ['issueIdOrKey', 'issueKey']) remember(name, fixtures.issueKey);

  remember('issueId', fixtures.issueKey);
  remember('id', fixtures.issueKey, '/rest/api/2/issue');
  remember('id', fixtures.projectId, '/rest/api/2/project');
  remember('id', fixtures.versionId, '/rest/api/2/version');
  remember('versionId', fixtures.versionId);
  remember('owningObjectId', fixtures.projectId);
  remember('id', fixtures.filterId, '/rest/api/2/filter');
  remember('id', fixtures.attachmentId, '/rest/api/2/attachment');
  remember('id', String(fixtures.workflowSchemeId), '/rest/api/2/workflowscheme');

  // Chosen rather than discovered: the fixtures store them under names this crawl can spell without being told what
  // this particular run happened to create.
  remember('propertyKey', FIXTURE.propertyKey);
  remember('attributeKey', FIXTURE.schemeAttributeKey);
  remember('globalId', FIXTURE.remoteVersionLinkGlobalId, '/rest/api/2/version');
  remember('type', 'project');
  remember('projectTypeKey', 'software');
});

async function callEndpoint(endpoint: Endpoint, parameters: Record<string, unknown>): Promise<Outcome> {
  try {
    const body = await endpoint.call(client, parameters);

    harvest(endpoint.name, body);

    return { name: endpoint.name, url: endpoint.url, status: 'ok' };
  } catch (error) {
    const status = (error as { status?: number }).status;

    // Jira answering "no" is an answer. Only a transport or schema failure is this crawl's business.
    if (typeof status === 'number') {
      return { name: endpoint.name, url: endpoint.url, status: 'refused', detail: String(status) };
    }

    return {
      name: endpoint.name,
      url: endpoint.url,
      status: 'error',
      detail: error instanceof Error ? error.message : String(error),
    };
  }
}

describe('crawling the Data Center surface', () => {
  const outcomes = new Map<string, Outcome>();

  it('reads every endpoint whose path parameters it can supply', async () => {
    const readable = endpoints.filter(endpoint => endpoint.method === 'GET');

    expect(readable.length).toBeGreaterThan(200);

    // Passes rather than one sweep, because reaching an endpoint can be what supplies the next one's parameter: a
    // sprint id is listed only by a board endpoint, and the board id only by the endpoint that lists boards. Looping
    // until a pass adds nothing turns that chain into coverage without hard-coding an order.
    for (let pass = 0; pass < 6; pass += 1) {
      const reachable = readable.filter(
        endpoint =>
          !outcomes.has(endpoint.name)
          && endpoint.pathParameters.every(name => resolve(endpoint.url, name) !== undefined),
      );

      if (reachable.length === 0) break;

      for (const endpoint of reachable) {
        // An empty object, not nothing: an endpoint with no path parameters can still take query ones, and its
        // generated signature then reads `parameters` unconditionally. Passing nothing is a TypeError in the crawl
        // rather than an answer from Jira, and a required query parameter left out comes back as a 400, which is a
        // fair answer.
        const parameters = Object.fromEntries(
          endpoint.pathParameters.map(name => [name, resolve(endpoint.url, name)]),
        );

        outcomes.set(endpoint.name, await callEndpoint(endpoint, parameters));
      }
    }

    const answered = [...outcomes.values()].filter(outcome => outcome.status === 'ok');
    const refused = [...outcomes.values()].filter(outcome => outcome.status === 'refused');
    const failed = [...outcomes.values()].filter(outcome => outcome.status === 'error');
    const unreached = readable.filter(endpoint => !outcomes.has(endpoint.name));

    console.log(
      `  ${outcomes.size}/${readable.length} called — ${answered.length} answered, ${refused.length} refused, `
        + `${failed.length} failed; ${unreached.length} never reachable`,
    );

    if (unreached.length > 0) {
      const missing = new Set(
        unreached.flatMap(endpoint =>
          endpoint.pathParameters.filter(name => resolve(endpoint.url, name) === undefined),
        ),
      );

      console.log(`  nothing supplies: ${[...missing].sort().join(', ')}`);
      console.log(`  out of reach: ${unreached.map(endpoint => endpoint.name).sort().join(', ')}`);
    }

    expect(failed, failed.map(outcome => `${outcome.name}: ${outcome.detail}`).join('\n')).toEqual([]);
  });

  it('found no response the schemas do not describe', () => {
    const byEndpoint = new Map<string, string[]>();

    for (const report of mismatches) {
      const lines = byEndpoint.get(report.endpoint) ?? [];

      for (const issue of report.issues) {
        const line = `${issue.path || '(root)'}: expected ${issue.expected}, got ${issue.received}`;

        if (!lines.includes(line)) lines.push(line);
      }

      byEndpoint.set(report.endpoint, lines);
    }

    // Printed rather than left to the assertion diff: this list is the worklist for the generator, and it has to be
    // readable as one.
    for (const [endpoint, lines] of [...byEndpoint].sort()) console.log(`  ${endpoint}\n    ${lines.join('\n    ')}`);

    expect([...byEndpoint.keys()], `${byEndpoint.size} endpoints drifted`).toEqual([]);
  });
});
