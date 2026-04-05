import type { Client } from '@jira.js/base';
import { z } from 'zod';
import { type AgileClient, createAgileClient } from '../../../src/createAgileClient';
import { getLiveEnv, type LiveEnv } from './liveEnv';
import { createLiveBaseClient } from './liveBaseClient';
import { getInjectedLiveProject, type LiveProjectHandle } from './liveTestState';
import { ResourceRegistry } from './resourceRegistry';
import { buildNamespace, uid } from './namespace';

const FilterCreatedSchema = z.object({ id: z.coerce.number() });

export interface LiveTestBoardHandle {
  boardId: number;
  filterId: number;
}

export type LiveTestBoardOption = { type: 'isolated'; boardKind?: 'scrum' | 'kanban' } | { type: 'none' };

export interface LiveTestContextOptions {
  describe: string;
  board?: LiveTestBoardOption;
}

export interface LiveTestContext {
  readonly client: AgileClient;
  readonly http: Client;
  readonly env: LiveEnv;
  readonly project: LiveProjectHandle;
  readonly board: LiveTestBoardHandle | null;
  readonly registry: ResourceRegistry;
  namespace(label?: string): string;
  uid(prefix?: string): string;
  beginTest(name: string): void;
  registerForTest(resource: { kind: string; id: string; delete: () => Promise<void> }): void;
  cleanupTest(): Promise<void>;
  dispose(): Promise<void>;
}

export async function createLiveTestContext(options: LiveTestContextOptions): Promise<LiveTestContext> {
  const env = getLiveEnv();

  if (!env) {
    throw new Error(
      'Live env not configured. Set JIRA_BASE_URL, JIRA_EMAIL, and JIRA_API_TOKEN environment variables.',
    );
  }

  const project = getInjectedLiveProject();
  const client = createAgileClient({
    host: env.baseUrl,
    auth: { type: 'basic', email: env.email, apiToken: env.apiToken },
  });
  const http = createLiveBaseClient(env);

  const describeRegistry = new ResourceRegistry();
  let testRegistry = new ResourceRegistry();
  let currentTest: string | undefined;

  const board = await provisionBoard(client, http, project.projectKey, options.board, describeRegistry);

  return {
    client,
    http,
    env,
    project,
    board,
    registry: describeRegistry,
    namespace(label) {
      return buildNamespace({ describe: options.describe, test: currentTest }, label);
    },
    uid(prefix) {
      return uid(prefix);
    },
    beginTest(name) {
      currentTest = name;
      testRegistry = new ResourceRegistry();
    },
    registerForTest(resource) {
      testRegistry.register(resource);
    },
    async cleanupTest() {
      await testRegistry.cleanup();
      currentTest = undefined;
    },
    async dispose() {
      await testRegistry.cleanup();
      await describeRegistry.cleanup();
    },
  };
}

async function provisionBoard(
  client: AgileClient,
  http: Client,
  projectKey: string,
  option: LiveTestBoardOption | undefined,
  registry: ResourceRegistry,
): Promise<LiveTestBoardHandle | null> {
  if (!option || option.type === 'none') return null;

  const suffix = `${Date.now()}-${globalThis.crypto.randomUUID().slice(0, 8)}`;
  const filter = await http.sendRequest({
    url: '/rest/api/3/filter',
    method: 'POST',
    body: {
      name: `sdk-live-filter-${suffix}`,
      jql: `project = ${projectKey} ORDER BY Rank ASC`,
    },
    schema: FilterCreatedSchema,
  });

  registry.register({
    kind: 'filter',
    id: String(filter.id),
    delete: async () => {
      await http.sendRequest({ url: `/rest/api/3/filter/${filter.id}`, method: 'DELETE' });
    },
  });

  try {
    const board = await client.board.createBoard({
      name: `sdk-live-board-${suffix}`,
      type: option.boardKind ?? 'scrum',
      filterId: filter.id,
      location: { type: 'project', projectKeyOrId: projectKey },
    });

    if (board.id == null) {
      throw new Error('createBoard returned no board id');
    }

    const boardId = board.id;
    registry.register({
      kind: 'board',
      id: String(boardId),
      delete: async () => {
        await client.board.deleteBoard({ boardId });
      },
    });

    return { boardId, filterId: filter.id };
  } catch (error) {
    await http.sendRequest({ url: `/rest/api/3/filter/${filter.id}`, method: 'DELETE' }).catch(() => {});
    throw error;
  }
}
