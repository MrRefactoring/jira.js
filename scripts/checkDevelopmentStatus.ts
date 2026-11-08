import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createClient, isApiError } from '../dist/core/index.js';
import { createServerClient } from '../dist/server/index.js';
import type { DevelopmentStatusDetail } from '../dist/server/models/index.js';
import { serverTestEnv } from '../tests/live/server/setup/env.ts';

const issueKey = process.env.JIRA_SERVER_DEV_ISSUE_KEY;
const applicationType = process.env.JIRA_SERVER_DEV_APPLICATION_TYPE;

if (!issueKey || !applicationType) {
  throw new Error(
    'Set JIRA_SERVER_DEV_ISSUE_KEY and JIRA_SERVER_DEV_APPLICATION_TYPE to a real development-linked fixture.',
  );
}

const { host, username, password } = serverTestEnv();
const jira = createServerClient(
  createClient({
    host,
    auth: { type: 'basic', username, password },
    onSchemaMismatch: 'throw',
  }),
);
const issue = await jira.issues.getIssue({ issueIdOrKey: issueKey });

if (!issue.id || !/^\d+$/.test(issue.id)) {
  throw new Error(`No numeric issue ID returned for ${issueKey}.`);
}

const responses = new Map<string, DevelopmentStatusDetail>();
const unavailable: Array<{ dataType: string; status: number }> = [];

for (const dataType of ['pullrequest', 'repository', 'branch']) {
  let response: DevelopmentStatusDetail;

  try {
    response = await jira.developmentStatus.getIssueDevelopmentStatusDetail({
      issueId: issue.id,
      applicationType,
      dataType,
    });
  } catch (error) {
    if (!isApiError(error)) throw error;

    unavailable.push({ dataType, status: error.status });
    console.log(JSON.stringify({ issueKey, issueId: issue.id, applicationType, dataType, status: error.status }));

    continue;
  }

  responses.set(dataType, response);

  const counts = response.detail.reduce(
    (total, item) => ({
      pullRequests: total.pullRequests + (Array.isArray(item.pullRequests) ? item.pullRequests.length : 0),
      branches: total.branches + (Array.isArray(item.branches) ? item.branches.length : 0),
      repositories: total.repositories + (item.repositories?.length ?? 0),
    }),
    { pullRequests: 0, branches: 0, repositories: 0 },
  );

  console.log(
    JSON.stringify({
      issueKey,
      issueId: issue.id,
      applicationType,
      dataType,
      errors: response.errors.length,
      ...counts,
    }),
  );
}

const detail = [...responses.values()]
  .filter(response => response.errors.length === 0)
  .flatMap(response => response.detail);
const hasPullRequests = detail.some(item => Array.isArray(item.pullRequests) && item.pullRequests.length > 0);
const hasBranches = detail.some(item => Array.isArray(item.branches) && item.branches.length > 0);
const verified = hasPullRequests && hasBranches;

const outputDirectory = process.env.JIRA_SERVER_DEV_CAPTURE_DIR;

if (outputDirectory) {
  mkdirSync(outputDirectory, { recursive: true });

  for (const [dataType, response] of responses) {
    writeFileSync(resolve(outputDirectory, `${dataType}.json`), `${JSON.stringify(response, null, 2)}\n`);
  }

  writeFileSync(
    resolve(outputDirectory, 'verification.json'),
    `${JSON.stringify(
      {
        issueKey,
        issueId: issue.id,
        applicationType,
        verified,
        hasPullRequests,
        hasBranches,
        unavailable,
      },
      null,
      2,
    )}\n`,
  );
}

if (!verified) {
  throw new Error(
    'Live verification requires successful nonempty development responses containing pull requests and branches.',
  );
}
