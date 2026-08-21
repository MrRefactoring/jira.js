import { CustomFieldOptionSchema, type CustomFieldOption } from '../models/customFieldOption';
import type { GetCustomFieldOption } from '../parameters/getCustomFieldOption';
import type { Client, SendRequestOptions } from '#/core';

/** Returns a full representation of the Custom Field Option that has the given id. */
export async function getCustomFieldOption(
  client: Client,
  parameters: GetCustomFieldOption,
): Promise<CustomFieldOption> {
  const config: SendRequestOptions<CustomFieldOption> = {
    url: `/rest/api/2/customFieldOption/${parameters.id}`,
    method: 'GET',
    schema: CustomFieldOptionSchema,
  };

  return await client.sendRequest(config);
}
