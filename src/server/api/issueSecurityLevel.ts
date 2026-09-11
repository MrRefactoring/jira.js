import { SecurityLevelJsonSchema, type SecurityLevelJson } from '../models/securityLevelJson';
import type { GetIssueSecurityLevel } from '../parameters/getIssueSecurityLevel';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Returns a full representation of the security level that has the given id. */
export async function getIssueSecurityLevel(
  client: Client,
  parameters: GetIssueSecurityLevel,
  options?: RequestOptions,
): Promise<SecurityLevelJson> {
  const config: SendRequestOptions<SecurityLevelJson> = {
    url: `/rest/api/2/securitylevel/${parameters.id}`,
    method: 'GET',
    schema: SecurityLevelJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
