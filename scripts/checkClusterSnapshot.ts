import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createServerClient } from '../dist/server/index.js';
import { serverTestEnv } from '../tests/live/server/setup/env.ts';

const sourceNodeId = process.env.JIRA_SERVER_CLUSTER_SOURCE_NODE_ID;
const currentNodeId = process.env.JIRA_SERVER_CLUSTER_CURRENT_NODE_ID;

if (!process.env.JIRA_SERVER_BASE_URL || !sourceNodeId || !currentNodeId || sourceNodeId === currentNodeId) {
  throw new Error(
    'Set JIRA_SERVER_BASE_URL and distinct source/current node IDs for a dedicated licensed test cluster.',
  );
}

const { host, username, password } = serverTestEnv();
let snapshotStatus: number | undefined;
let snapshotBodyBytes: number | undefined;
const jira = createServerClient({
  host,
  auth: { type: 'basic', username, password },
  onSchemaMismatch: 'throw',
  fetch: async (input, init) => {
    const response = await fetch(input, init);

    if (init?.method === 'PUT') {
      snapshotStatus = response.status;
      snapshotBodyBytes = Buffer.byteLength(await response.clone().text());
    }

    return response;
  },
});
const server = await jira.serverInfo.getServerInfo();
const nodes = await jira.cluster.getAllNodes();
const active = nodes.filter(node => node.state === 'ACTIVE' && node.alive !== false).map(node => node.nodeId);

if (!active.includes(sourceNodeId) || !active.includes(currentNodeId)) {
  throw new Error('Both distinct fixture nodes must be active before requesting the snapshot.');
}

const result = await jira.cluster.requestCurrentIndexFromNode({ nodeId: sourceNodeId });

if (result !== undefined || snapshotBodyBytes !== 0) {
  throw new Error('The cluster snapshot success response was not empty; review the actual server contract.');
}

const report = {
  verifiedAt: new Date().toISOString(),
  jiraVersion: server.version,
  currentNodeId,
  sourceNodeId,
  nodes,
  status: snapshotStatus,
  responseBytes: snapshotBodyBytes,
  requestAccepted: true,
  snapshotCompletionVerified: false,
};
const outputDirectory = process.env.JIRA_SERVER_CLUSTER_CAPTURE_DIR;

if (outputDirectory) {
  mkdirSync(outputDirectory, { recursive: true });
  writeFileSync(resolve(outputDirectory, 'verification.json'), `${JSON.stringify(report, null, 2)}\n`);
}

console.log(JSON.stringify(report));
