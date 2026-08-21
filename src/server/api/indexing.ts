import { IndexSnapshotSchema, type IndexSnapshot } from '../models/indexSnapshot';
import { IndexSnapshotPromiseSchema, type IndexSnapshotPromise } from '../models/indexSnapshotPromise';
import { IndexSnapshotStatusSchema, type IndexSnapshotStatus } from '../models/indexSnapshotStatus';
import { IndexSummarySchema, type IndexSummary } from '../models/indexSummary';
import { ReindexSchema, type Reindex } from '../models/reindex';
import { ReindexRequestSchema, type ReindexRequest } from '../models/reindexRequest';
import type { GetReindexInfo } from '../parameters/getReindexInfo';
import type { Reindex as ReindexParameters } from '../parameters/reindex';
import type { ReindexIssues } from '../parameters/reindexIssues';
import type { GetReindexProgress } from '../parameters/getReindexProgress';
import type { GetProgressBulk } from '../parameters/getProgressBulk';
import type { GetReindexRequestProgress } from '../parameters/getReindexRequestProgress';
import type { Client, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Lists available index snapshots absolute paths with timestamps */
export async function listIndexSnapshot(client: Client): Promise<IndexSnapshot[]> {
  const config: SendRequestOptions<IndexSnapshot[]> = {
    url: '/rest/api/2/index-snapshot',
    method: 'GET',
    schema: z.array(IndexSnapshotSchema),
  };

  return await client.sendRequest(config);
}

/** Starts taking an index snapshot if no other snapshot creation process is in progress */
export async function createIndexSnapshot(client: Client): Promise<IndexSnapshotPromise> {
  const config: SendRequestOptions<IndexSnapshotPromise> = {
    url: '/rest/api/2/index-snapshot',
    method: 'POST',
    schema: IndexSnapshotPromiseSchema,
  };

  return await client.sendRequest(config);
}

/** Checks if index snapshot creation is currently running */
export async function isIndexSnapshotRunning(client: Client): Promise<IndexSnapshotStatus> {
  const config: SendRequestOptions<IndexSnapshotStatus> = {
    url: '/rest/api/2/index-snapshot/isRunning',
    method: 'GET',
    schema: IndexSnapshotStatusSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a summary of the index condition of the current node. The returned data consists of:
 *
 * - `nodeId` - Node identifier.
 * - `reportTime` - Time of this report creation.
 * - `issueIndex` - Summary of the issue index status.
 * - `replicationQueues` - Map of index replication queues, where keys represent nodes from which replication operations
 *   came from.
 * - `externalPlatformIndexReplay` - Map of external platform's index replay queues, where keys represents which node
 *   logged to index replay queue (journal)
 *
 * `issueIndex` can contain: - `indexReadable` - If `false` the endpoint failed to read data from the issue index (check
 * Jira logs for detailed stack trace), otherwise `true`. - `countInDatabase` - Count of issues found in the database. -
 * `countInIndex` - Count of issues found while querying the index. - `lastUpdatedInDatabase` - Time of the last update
 * of the issue found in the database. - `lastUpdatedInIndex` - Time of the last update of the issue found while
 * querying the index. `replicationQueues`'s map values can contain: - `lastConsumedOperation` - Last executed index
 * replication operation by the current node from the sending node's queue. - `lastConsumedOperation.id` - Identifier of
 * the operation. - `lastConsumedOperation.replicationTime` - Time when the operation was sent to other nodes. -
 * `lastOperationInQueue` - Last index replication operation in the sending node's queue. - `lastOperationInQueue.id` -
 * Identifier of the operation. - `lastOperationInQueue.replicationTime` - Time when the operation was sent to other
 * nodes. - `queueSize` - Number of operations in the queue from the sending node to the current node.
 * `externalPlatformIndexReplay`'s map values can contain: - `lastConsumedOperation` - Last executed external platform's
 * index replay operation. - `lastConsumedOperation.id` - Identifier of the operation. -
 * `lastConsumedOperation.journalWriteTime` - Time when the operation was written to the journal. -
 * `lastOperationInQueue` - Last external platform's index replay operation in the replay queue. -
 * `lastOperationInQueue.id` - Identifier of the operation. - `lastOperationInQueue.journalWriteTime` - Time when the
 * operation was written to the journal. - `queueSize` - Number of operations in the queue awaiting synchronization with
 * the external platform's index.
 */
export async function getIndexSummary(client: Client): Promise<IndexSummary> {
  const config: SendRequestOptions<IndexSummary> = {
    url: '/rest/api/2/index/summary',
    method: 'GET',
    schema: IndexSummarySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns information on the system reindexes. If a reindex is currently taking place then information about this
 * reindex is returned. If there is no active index task, then returns information about the latest reindex task run,
 * otherwise returns a 404 indicating that no reindex has taken place.
 */
export async function getReindexInfo(client: Client, parameters?: GetReindexInfo): Promise<Reindex> {
  const config: SendRequestOptions<Reindex> = {
    url: '/rest/api/2/reindex',
    method: 'GET',
    searchParams: {
      taskId: parameters?.taskId,
    },
    schema: ReindexSchema,
  };

  return await client.sendRequest(config);
}

/** Kicks off a reindex. Need Admin permissions to perform this reindex. */
export async function reindex(client: Client, parameters: ReindexParameters): Promise<Reindex> {
  const config: SendRequestOptions<Reindex> = {
    url: '/rest/api/2/reindex',
    method: 'POST',
    searchParams: {
      indexChangeHistory: parameters.indexChangeHistory,
      type: parameters.type,
      indexWorklogs: parameters.indexWorklogs,
      indexComments: parameters.indexComments,
    },
    schema: ReindexSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Reindexes one or more individual issues. Indexing is performed synchronously - the call returns when indexing of the
 * issues has completed or a failure occurs.
 */
export async function reindexIssues(client: Client, parameters: ReindexIssues): Promise<Reindex> {
  const config: SendRequestOptions<Reindex> = {
    url: '/rest/api/2/reindex/issue',
    method: 'POST',
    searchParams: {
      issueId: parameters.issueId,
      indexChangeHistory: parameters.indexChangeHistory,
      indexWorklogs: parameters.indexWorklogs,
      indexComments: parameters.indexComments,
    },
    schema: ReindexSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns information on the system reindexes. If a reindex is currently taking place then information about this
 * reindex is returned. If there is no active index task, then returns information about the latest reindex task run,
 * otherwise returns a 404 indicating that no reindex has taken place.
 */
export async function getReindexProgress(client: Client, parameters?: GetReindexProgress): Promise<Reindex> {
  const config: SendRequestOptions<Reindex> = {
    url: '/rest/api/2/reindex/progress',
    method: 'GET',
    searchParams: {
      taskId: parameters?.taskId,
    },
    schema: ReindexSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Executes any pending reindex requests. Execution is asynchronous - progress of the returned tasks can be monitored
 * through other REST calls.
 */
export async function processRequests(client: Client): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/2/reindex/request',
    method: 'POST',
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves the progress of multiple reindex requests. Only reindex requests that actually exist will be returned in
 * the results.
 */
export async function getProgressBulk(client: Client, parameters?: GetProgressBulk): Promise<ReindexRequest[]> {
  const config: SendRequestOptions<ReindexRequest[]> = {
    url: '/rest/api/2/reindex/request/bulk',
    method: 'GET',
    searchParams: {
      requestId: parameters?.requestId,
    },
    schema: z.array(ReindexRequestSchema),
  };

  return await client.sendRequest(config);
}

/** Retrieves the progress of a single reindex request. */
export async function getReindexRequestProgress(
  client: Client,
  parameters: GetReindexRequestProgress,
): Promise<ReindexRequest> {
  const config: SendRequestOptions<ReindexRequest> = {
    url: `/rest/api/2/reindex/request/${parameters.requestId}`,
    method: 'GET',
    schema: ReindexRequestSchema,
  };

  return await client.sendRequest(config);
}
