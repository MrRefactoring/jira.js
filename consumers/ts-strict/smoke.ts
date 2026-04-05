// TypeScript strict-mode consumer smoke test.
// Validates type inference under strict + moduleResolution=node16.
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
  type SendRequestOptions,
} from '@jira.js/base';

// --- ClientConfig shape ---
const config: ClientConfig = {
  host: 'https://test.atlassian.net',
  auth: { type: 'basic', email: 'user@example.com', apiToken: 'token' },
};

// --- createClient returns Client ---
const baseClient: Client = createClient(config);

// --- Client.sendRequest generic parameter is preserved ---
async function checkGenericPreservation(): Promise<void> {
  const result: { id: string } = await baseClient.sendRequest<{ id: string }>({
    url: '/rest/api/3/issue/PROJ-1',
    method: 'GET' satisfies HttpMethod,
  });
  const _id: string = result.id;
}

// --- Auth variants ---
const _basicAuth: Auth = { type: 'basic', email: 'user@example.com', apiToken: 'token' };
const _bearerAuth: Auth = { type: 'bearer', token: 'jwt-token' };

// --- ApiError is correctly typed ---
function handleError(e: unknown): void {
  if (e instanceof ApiError) {
    const _status: number = e.status;
    const _statusText: string = e.statusText;
    const _body: unknown = e.body;
    const _message: string = e.message;
  }
}

// --- createCloudClient returns a typed client ---
const cloudClient = createCloudClient(config);

// Issues namespace
async function checkIssues(): Promise<void> {
  const issue = await cloudClient.issues.getIssue({ issueIdOrKey: 'PROJ-1' });
}

async function checkTransitions(): Promise<void> {
  await cloudClient.issues.doTransition({ issueIdOrKey: 'PROJ-1', transition: { id: '31' } });
}

// Projects namespace
async function checkProjects(): Promise<void> {
  const projects = await cloudClient.projects.searchProjects({});
}

// issueSearch namespace
async function checkSearch(): Promise<void> {
  const results = await cloudClient.issueSearch.searchAndReconsileIssuesUsingJql({ jql: 'project = PROJ' });
}

// --- createAgileClient ---
const agileClient = createAgileClient(config);

async function checkAgile(): Promise<void> {
  const boards = await agileClient.board.getAllBoards({});
}

// --- HttpMethod rejects invalid values ---
// @ts-expect-error — 'CONNECT' is not a valid HttpMethod
const _badMethod: HttpMethod = 'CONNECT';

// --- SendRequestOptions requires url ---
// @ts-expect-error — url is required
const _badOpts: SendRequestOptions = { method: 'GET' };

// Suppress unused variable warnings
void checkGenericPreservation;
void handleError;
void checkIssues;
void checkTransitions;
void checkProjects;
void checkSearch;
void checkAgile;
