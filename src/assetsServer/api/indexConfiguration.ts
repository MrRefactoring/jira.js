import { IndexIntegrityOutSchema, type IndexIntegrityOut } from '../models/indexIntegrityOut';
import { IndexPathSchema, type IndexPath } from '../models/indexPath';
import { IndexPersistResponseSchema, type IndexPersistResponse } from '../models/indexPersistResponse';
import { ProgressOutSchema, type ProgressOut } from '../models/progressOut';
import type { StartReindexInsight } from '../parameters/startReindexInsight';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Check the integrity of the index. */
export async function checkIndexIntegrity(client: Client, options?: RequestOptions): Promise<IndexIntegrityOut> {
  const config: SendRequestOptions<IndexIntegrityOut> = {
    url: '/rest/assets/1.0/index/checkNodeIntegrity',
    method: 'GET',
    schema: IndexIntegrityOutSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Get the path to the current Assets Index. */
export async function getIndexPath(client: Client, options?: RequestOptions): Promise<IndexPath> {
  const config: SendRequestOptions<IndexPath> = {
    url: '/rest/assets/1.0/index/path',
    method: 'GET',
    schema: IndexPathSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Persist the current Assets Index to a file on disk. */
export async function persistIndexToFile(client: Client, options?: RequestOptions): Promise<IndexPersistResponse> {
  const config: SendRequestOptions<IndexPersistResponse> = {
    url: '/rest/assets/1.0/index/persist',
    method: 'POST',
    schema: IndexPersistResponseSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Start an asynchronous reindex of the Assets Index for the current node. */
export async function startReindexCurrentNode(client: Client, options?: RequestOptions): Promise<ProgressOut> {
  const config: SendRequestOptions<ProgressOut> = {
    url: '/rest/assets/1.0/index/reindex/currentnode',
    method: 'POST',
    schema: ProgressOutSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Start an asynchronous reindex of the Assets Index for the entire cluster. */
export async function startReindexInsight(
  client: Client,
  parameters: StartReindexInsight,
  options?: RequestOptions,
): Promise<ProgressOut> {
  const config: SendRequestOptions<ProgressOut> = {
    url: '/rest/assets/1.0/index/reindex/start',
    method: 'POST',
    searchParams: {
      clean: parameters.clean,
    },
    schema: ProgressOutSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
