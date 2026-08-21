import { IndexIntegrityOutSchema, type IndexIntegrityOut } from '../models/indexIntegrityOut';
import { IndexPathSchema, type IndexPath } from '../models/indexPath';
import { IndexPersistResponseSchema, type IndexPersistResponse } from '../models/indexPersistResponse';
import { ProgressOutSchema, type ProgressOut } from '../models/progressOut';
import type { StartReindexInsight } from '../parameters/startReindexInsight';
import type { Client, SendRequestOptions } from '#/core';

/** Check the integrity of the index. */
export async function checkIndexIntegrity(client: Client): Promise<IndexIntegrityOut> {
  const config: SendRequestOptions<IndexIntegrityOut> = {
    url: '/rest/assets/1.0/index/checkNodeIntegrity',
    method: 'GET',
    schema: IndexIntegrityOutSchema,
  };

  return await client.sendRequest(config);
}

/** Get the path to the current Assets Index. */
export async function getIndexPath(client: Client): Promise<IndexPath> {
  const config: SendRequestOptions<IndexPath> = {
    url: '/rest/assets/1.0/index/path',
    method: 'GET',
    schema: IndexPathSchema,
  };

  return await client.sendRequest(config);
}

/** Persist the current Assets Index to a file on disk. */
export async function persistIndexToFile(client: Client): Promise<IndexPersistResponse> {
  const config: SendRequestOptions<IndexPersistResponse> = {
    url: '/rest/assets/1.0/index/persist',
    method: 'POST',
    schema: IndexPersistResponseSchema,
  };

  return await client.sendRequest(config);
}

/** Start an asynchronous reindex of the Assets Index for the current node. */
export async function startReindexCurrentNode(client: Client): Promise<ProgressOut> {
  const config: SendRequestOptions<ProgressOut> = {
    url: '/rest/assets/1.0/index/reindex/currentnode',
    method: 'POST',
    schema: ProgressOutSchema,
  };

  return await client.sendRequest(config);
}

/** Start an asynchronous reindex of the Assets Index for the entire cluster. */
export async function startReindexInsight(client: Client, parameters: StartReindexInsight): Promise<ProgressOut> {
  const config: SendRequestOptions<ProgressOut> = {
    url: '/rest/assets/1.0/index/reindex/start',
    method: 'POST',
    searchParams: {
      clean: parameters.clean,
    },
    schema: ProgressOutSchema,
  };

  return await client.sendRequest(config);
}
