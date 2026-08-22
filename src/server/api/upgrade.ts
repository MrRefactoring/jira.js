import { UpgradeResultSchema, type UpgradeResult } from '../models/upgradeResult';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Returns the result of the last upgrade task. */
export async function getUpgradeResult(client: Client, options?: RequestOptions): Promise<UpgradeResult> {
  const config: SendRequestOptions<UpgradeResult> = {
    url: '/rest/api/2/upgrade',
    method: 'GET',
    schema: UpgradeResultSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Runs any pending delayed upgrade tasks. Need Admin permissions to do this. */
export async function runUpgradesNow(client: Client, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/upgrade',
    method: 'POST',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
