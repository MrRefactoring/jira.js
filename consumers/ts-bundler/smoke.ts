// TypeScript bundler-resolution consumer smoke test.
// Validates type inference under moduleResolution=bundler (Vite, esbuild, etc.).
// This file is ONLY typechecked (tsc --noEmit), not executed.
import { createCloudClient } from '@jira.js/cloud';
import { createAgileClient } from '@jira.js/agile';
import {
  ApiError,
  createClient,
  type ClientConfig,
  type Auth,
  type HttpMethod,
  type Client,
} from '@jira.js/base';

// moduleResolution=bundler allows extensionless imports (same as ESM bundlers do)
const config: ClientConfig = {
  host: 'https://test.atlassian.net',
  auth: { type: 'basic', email: 'user@example.com', apiToken: 'token' } satisfies Extract<Auth, { type: 'basic' }>,
};

// createClient type inference
const baseClient: Client = createClient(config);

// Generic type parameter flows through to return type
async function genericPreservation(): Promise<{ id: string }> {
  return baseClient.sendRequest<{ id: string }>({ url: '/rest/api/3/issue/PROJ-1' });
}

// cloudClient in bundler mode
const cloudClient = createCloudClient(config);

// Namespaces are present
type IssuesType = typeof cloudClient.issues;
type ProjectsType = typeof cloudClient.projects;

// Method return types are Promise-based
type GetIssueFn = IssuesType['getIssue'];
type GetIssueReturn = ReturnType<GetIssueFn>;
type IsGetIssuePromise = GetIssueReturn extends Promise<unknown> ? true : false;
const _check: IsGetIssuePromise = true;

// agileClient
const agileClient = createAgileClient(config);
type AllBoardsFn = typeof agileClient.board.getAllBoards;

// HttpMethod is a literal union, not a wide string
const validMethod: HttpMethod = 'GET';
// @ts-expect-error — arbitrary string is not HttpMethod
const invalidMethod: HttpMethod = 'SUBSCRIBE';

// ApiError is throwable and its fields are typed
function useApiError(): void {
  throw new ApiError('Network error', 503, 'Service Unavailable', null);
}

void genericPreservation;
void useApiError;
void validMethod;
