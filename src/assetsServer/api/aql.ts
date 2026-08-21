import { ObjectListResultSchema, type ObjectListResult } from '../models/objectListResult';
import type { FindObjects } from '../parameters/findObjects';
import type { Client, SendRequestOptions } from '#/core';

/** Find objects using AQL. */
export async function findObjects(client: Client, parameters?: FindObjects): Promise<ObjectListResult> {
  const config: SendRequestOptions<ObjectListResult> = {
    url: '/rest/assets/1.0/aql/objects',
    method: 'GET',
    searchParams: {
      includeAttributesDeep: parameters?.includeAttributesDeep,
      xoauth_requestor_id: parameters?.xoauth_requestor_id,
      includeTypeAttributes: parameters?.includeTypeAttributes,
      resultPerPage: parameters?.resultPerPage,
      includeAttributes: parameters?.includeAttributes,
      qlQuery: parameters?.qlQuery,
      page: parameters?.page,
      includeExtendedInfo: parameters?.includeExtendedInfo,
    },
    schema: ObjectListResultSchema,
  };

  return await client.sendRequest(config);
}
