import { SecurityLevelJsonSchema, type SecurityLevelJson } from '../models/securityLevelJson';
import type { GetIssuesecuritylevel } from '../parameters/getIssuesecuritylevel';
import type { Client, SendRequestOptions } from '#/core';

/** Returns a full representation of the security level that has the given id. */
export async function getIssuesecuritylevel(
  client: Client,
  parameters: GetIssuesecuritylevel,
): Promise<SecurityLevelJson> {
  const config: SendRequestOptions<SecurityLevelJson> = {
    url: `/rest/api/2/securitylevel/${parameters.id}`,
    method: 'GET',
    schema: SecurityLevelJsonSchema,
  };

  return await client.sendRequest(config);
}
