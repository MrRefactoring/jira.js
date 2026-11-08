/**
 * Installs the packed tarball into a throwaway project and uses it the way a consumer would.
 *
 * Everything else in CI reads this repository's own tree, where the source resolves through `tsconfig` paths and the
 * `#/` alias. A consumer has neither. The failures that class produces have all shipped before:
 *
 * - a subpath that resolves here and 404s from `node_modules` (#403);
 * - an `exports` map that answers for `import` but not for a type resolver, so every consumer's `tsc` fails while the
 *   runtime is fine (#381, #383);
 * - a stray `package.json` inside `src/`, which redefines `#/` for the files under it and breaks the source
 *   navigation that shipping `src/` exists to provide — invisible to a build that resolves the alias through
 *   `tsconfig` instead.
 *
 * Both type resolvers are exercised, because they disagree: `bundler` reads `exports` loosely, `nodenext` enforces
 * extensions and the ESM/CJS split.
 *
 * Runs on bare `node`; keep the types erasable.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TYPESCRIPT_FLOOR = '5.7';

if (!existsSync(join(root, 'dist'))) {
  console.error('[consumers] dist/ is missing. Run `pnpm run build` first.');
  process.exit(1);
}

const problems: string[] = [];
const workspace = mkdtempSync(join(tmpdir(), 'jira-js-consumer-'));

function run(command: string, args: string[], cwd: string): string {
  return execFileSync(command, args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

try {
  const packOutput = run('npm', ['pack', '--pack-destination', workspace, '--silent'], root);
  const tarball = join(workspace, packOutput.trim().split('\n').at(-1) as string);

  const packed = run('tar', ['tzf', tarball], workspace)
    .split('\n')
    .map(entry => entry.replace(/^package\//, ''));

  const nestedManifests = packed.filter(entry => /^src\/.+\/package\.json$/.test(entry));

  if (nestedManifests.length > 0) {
    problems.push(
      `the tarball carries a package.json inside src/ (${nestedManifests.join(', ')}). ` +
        'It overrides the root `imports` map for every file beneath it, so `#/` stops pointing at src/.',
    );
  }

  writeFileSync(
    join(workspace, 'package.json'),
    `${JSON.stringify({ name: 'consumer', private: true, type: 'module', version: '0.0.0' }, null, 2)}\n`,
  );

  run('npm', ['install', '--no-audit', '--no-fund', '--silent', tarball], workspace);

  const SUBPATHS = Object.keys(JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).exports)
    .filter(entry => entry !== './browser' && entry !== './package.json')
    .map(entry => (entry === '.' ? 'jira.js' : `jira.js/${entry.slice(2)}`));

  const TYPES_ONLY: string[] = [];

  const runtimeProbe = [
    ...SUBPATHS.map((subpath, index) => `import * as m${index} from '${subpath}';`),
    "import { createServerClient, getIssueDevelopmentStatusDetail } from 'jira.js/server';",
    "import { requestCurrentIndexFromNode } from 'jira.js/server';",
    "import { RequestCurrentIndexFromNodeSchema } from 'jira.js/server/parameters';",
    "import { DevelopmentStatusDetailSchema, DevelopmentStatusDetailItemSchema, DevelopmentStatusRepositorySchema, DevelopmentStatusBranchSchema, DevelopmentStatusPullRequestSchema, DevelopmentStatusPullRequestBranchSchema } from 'jira.js/server/models';",
    "import { GetIssueDevelopmentStatusDetailSchema } from 'jira.js/server/parameters';",
    "const developmentParameters = GetIssueDevelopmentStatusDetailSchema.parse({ issueId: '123', applicationType: 'vendor', dataType: 'pullrequest' });",
    'const developmentBody = DevelopmentStatusDetailSchema.parse({ errors: [], detail: [] });',
    'DevelopmentStatusDetailItemSchema.parse({ vendor: true });',
    'DevelopmentStatusRepositorySchema.parse({ vendor: true });',
    'DevelopmentStatusBranchSchema.parse({ name: "feature", vendor: true });',
    'DevelopmentStatusPullRequestSchema.parse({ status: "future", vendor: true });',
    'DevelopmentStatusPullRequestBranchSchema.parse({ branch: "feature", vendor: true });',
    "const developmentClient = { host: 'https://example.invalid', sendRequest: async () => developmentBody };",
    'await getIssueDevelopmentStatusDetail(developmentClient, developmentParameters);',
    'await createServerClient(developmentClient).developmentStatus.getIssueDevelopmentStatusDetail(developmentParameters);',
    "const snapshotParameters = RequestCurrentIndexFromNodeSchema.parse({ nodeId: 'node-2' });",
    "const snapshotClient = { host: 'https://example.invalid', sendRequest: async () => undefined };",
    'await requestCurrentIndexFromNode(snapshotClient, snapshotParameters);',
    'await createServerClient(snapshotClient).cluster.requestCurrentIndexFromNode(snapshotParameters);',
    `const surfaces = [${SUBPATHS.map((_, index) => `m${index}`).join(', ')}];`,
    `const names = ${JSON.stringify(SUBPATHS)};`,
    `const typesOnly = ${JSON.stringify(TYPES_ONLY)};`,
    'surfaces.forEach((surface, index) => {',
    '  const empty = Object.keys(surface).length === 0;',
    '  if (empty && !typesOnly.includes(names[index])) {',
    "    console.error(`empty namespace from ${names[index]}`);",
    '    process.exitCode = 1;',
    '  }',
    '  if (!empty && typesOnly.includes(names[index])) {',
    "    console.error(`${names[index]} is types only but exports runtime values`);",
    '    process.exitCode = 1;',
    '  }',
    '});',
    "if (typeof m0.createCloudClient !== 'function') {",
    "  console.error('createCloudClient is not a function on the root export');",
    '  process.exitCode = 1;',
    '}',
  ].join('\n');

  writeFileSync(join(workspace, 'probe.mjs'), `${runtimeProbe}\n`);

  try {
    run('node', ['probe.mjs'], workspace);
  } catch (error) {
    problems.push(`the package does not import from a consumer project:\n${(error as Error).message}`);
  }

  const typeProbe = [
    "import { createCloudClient, isNotFoundError } from 'jira.js';",
    "import { authBasicPasswordSchema, createClient, SchemaMismatchError, paginate } from 'jira.js/core';",
    "import type { Issue, PageString } from 'jira.js/cloud/models';",
    "import { IssueSchema as ServerIssueSchema, type Issue as ServerIssue } from 'jira.js/server/models';",
    "import type { GetAllLabels, SearchIssues } from 'jira.js/cloud/parameters';",
    "import type { ApiObjectConfig, AuthBasicPassword, Client } from 'jira.js/core';",
    "import type { WebhookHeaders, WebhookPayload } from 'jira.js/webhooks';",
    "import { createServerClient, getIssueDevelopmentStatusDetail } from 'jira.js/server';",
    "import type { DevelopmentStatusDetail, DevelopmentStatusDetailItem, DevelopmentStatusRepository, DevelopmentStatusBranch, DevelopmentStatusPullRequest, DevelopmentStatusPullRequestBranch } from 'jira.js/server/models';",
    "import type { GetIssueDevelopmentStatusDetail } from 'jira.js/server/parameters';",
    "import { requestCurrentIndexFromNode } from 'jira.js/server';",
    "import type { RequestCurrentIndexFromNode } from 'jira.js/server/parameters';",
    ...SUBPATHS.map((subpath, index) => `import type * as surface${index} from '${subpath}';`),
    '',
    "const client: Client = createClient({ host: 'https://example.atlassian.net' });",
    "export const developmentParameters: GetIssueDevelopmentStatusDetail = { issueId: '9007199254740993', applicationType: 'vendor', dataType: 'future' };",
    'export const developmentResult: Promise<DevelopmentStatusDetail> = getIssueDevelopmentStatusDetail(client, developmentParameters);',
    'export const boundDevelopmentResult: Promise<DevelopmentStatusDetail> = createServerClient(client).developmentStatus.getIssueDevelopmentStatusDetail(developmentParameters);',
    "export const snapshotParameters: RequestCurrentIndexFromNode = { nodeId: 'node-2' };",
    'export const snapshotResult: Promise<void> = requestCurrentIndexFromNode(client, snapshotParameters);',
    'export const boundSnapshotResult: Promise<void> = createServerClient(client).cluster.requestCurrentIndexFromNode(snapshotParameters);',
    'export const developmentItem = (result: DevelopmentStatusDetail): DevelopmentStatusDetailItem | undefined => result.detail[0];',
    'export const developmentRepository = (item: DevelopmentStatusDetailItem): DevelopmentStatusRepository | undefined => item.repositories?.[0];',
    'export const developmentBranch = (item: DevelopmentStatusDetailItem): DevelopmentStatusBranch | undefined => item.branches?.[0];',
    'export const developmentPullRequest = (item: DevelopmentStatusDetailItem): DevelopmentStatusPullRequest | undefined => item.pullRequests?.[0];',
    'export const developmentSource = (pr: DevelopmentStatusPullRequest): DevelopmentStatusPullRequestBranch | undefined => pr.source;',
    "export const basicPassword: AuthBasicPassword = { type: 'basic', username: 'user', password: 'password' };",
    'export const parsedBasicPassword = authBasicPasswordSchema.parse(basicPassword);',
    'export const acceptApiObjectConfig = (config: ApiObjectConfig): ApiObjectConfig => config;',
    'export const jira = createCloudClient(client);',
    'export const oldLabelsCall: () => Promise<PageString> = jira.labels.getAllLabels;',
    "export const labelFilters: GetAllLabels = { startAt: 0, maxResults: 1, query: 'prefix', scope: 'ALL_BROWSEABLE_PROJECTS' };",
    'export const filteredLabels: Promise<PageString> = jira.labels.getAllLabels(labelFilters);',
    "export const structuredMismatch = new SchemaMismatchError('mismatch', { endpoint: 'GET /x', issues: [] }, { cause: new Error('validation') });",
    "export const legacyMismatch = new SchemaMismatchError('mismatch', 'legacy body');",
    'export const structuredIssues: ConstructorParameters<typeof SchemaMismatchError>[1]["issues"] = structuredMismatch.report.issues;',
    'export const mismatchBody: string = structuredMismatch.body;',
    'export const paginatedLabels: AsyncIterable<string> = paginate({',
    '  initialParameters: { startAt: 0, maxResults: 1 },',
    '  fetchPage: jira.labels.getAllLabels,',
    '  getItems: page => page.values ?? [],',
    '  getNextParameters: (page, parameters) => page.isLast || !page.values?.length ? undefined : { ...parameters, startAt: parameters.startAt + page.values.length },',
    '});',
    "export const initialSearch: SearchIssues = { jql: 'project = EXAMPLE', maxResults: 1 };",
    'export const paginatedIssues: AsyncIterable<Issue> = paginate({',
    '  initialParameters: initialSearch,',
    '  fetchPage: jira.issueSearch.searchIssues,',
    '  getItems: page => page.issues ?? [],',
    '  getNextParameters: (page, parameters) => page.nextPageToken ? { ...parameters, nextPageToken: page.nextPageToken } : undefined,',
    '});',
    "export const minimalServerIssue: ServerIssue = ServerIssueSchema.parse({ id: '10000', fields: null });",
    'export const serverFields = (issue: ServerIssue): NonNullable<ServerIssue["fields"]> => issue.fields ?? {};',
    'export const serverSummary = (issue: ServerIssue): unknown => issue.fields?.summary;',
    'export const predicate: (value: unknown) => boolean = isNotFoundError;',
    'export const identify = (headers: WebhookHeaders, payload: WebhookPayload): string =>',
    "  `${payload.webhookEvent} ${headers['x-atlassian-webhook-identifier']}`;",
  ].join('\n');

  writeFileSync(join(workspace, 'probe.ts'), `${typeProbe}\n`);

  for (const moduleResolution of ['bundler', 'nodenext'] as const) {
    const module = moduleResolution === 'nodenext' ? 'nodenext' : 'esnext';

    writeFileSync(
      join(workspace, `tsconfig.${moduleResolution}.json`),
      `${JSON.stringify(
        {
          compilerOptions: { module, moduleResolution, noEmit: true, skipLibCheck: true, strict: true, target: 'es2022' },
          files: ['probe.ts'],
        },
        null,
        2,
      )}\n`,
    );

    try {
      run('node', [join(root, 'node_modules', 'typescript', 'bin', 'tsc'), '-p', `tsconfig.${moduleResolution}.json`], workspace);
    } catch (error) {
      const output = ((error as { stdout?: string }).stdout ?? (error as Error).message).trim();

      problems.push(`types do not resolve under moduleResolution "${moduleResolution}":\n${output}`);
    }
  }

  try {
    run('npm', ['install', '--no-audit', '--no-fund', '--silent', '--no-save', `typescript@${TYPESCRIPT_FLOOR}`], workspace);
  } catch (error) {
    problems.push(`TypeScript ${TYPESCRIPT_FLOOR} could not be installed:\n${(error as Error).message}`);
  }

  for (const moduleResolution of ['bundler', 'nodenext'] as const) {
    const module = moduleResolution === 'nodenext' ? 'nodenext' : 'esnext';
    const config = `tsconfig.floor.${moduleResolution}.json`;

    writeFileSync(
      join(workspace, config),
      `${JSON.stringify(
        {
          compilerOptions: { module, moduleResolution, noEmit: true, skipLibCheck: false, strict: true, target: 'es2022' },
          files: ['probe.ts'],
        },
        null,
        2,
      )}\n`,
    );

    try {
      run('node', [join(workspace, 'node_modules', 'typescript', 'bin', 'tsc'), '-p', config], workspace);
    } catch (error) {
      const output = ((error as { stdout?: string }).stdout ?? (error as Error).message).trim();

      problems.push(
        `TypeScript ${TYPESCRIPT_FLOOR}, the documented minimum, cannot read the declarations under moduleResolution "${moduleResolution}":\n${output}`,
      );
    }
  }
} finally {
  rmSync(workspace, { recursive: true, force: true });
}

if (problems.length > 0) {
  console.error(`[consumers] ${problems.length} problem(s):\n`);
  problems.forEach(problem => console.error(`  - ${problem}\n`));
  process.exit(1);
}

console.log('[consumers] the packed tarball installs, imports and type-checks from a clean project.');
