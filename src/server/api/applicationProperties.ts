import { ApplicationPropertySchema, type ApplicationProperty } from '../models/applicationProperty';
import type { GetApplicationProperties } from '../parameters/getApplicationProperties';
import type { SetPropertyViaRestfulTable } from '../parameters/setPropertyViaRestfulTable';
import type { Client, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Returns an application property. */
export async function getApplicationProperties(
  client: Client,
  parameters?: GetApplicationProperties,
): Promise<ApplicationProperty[]> {
  const config: SendRequestOptions<ApplicationProperty[]> = {
    url: '/rest/api/2/application-properties',
    method: 'GET',
    searchParams: {
      permissionLevel: parameters?.permissionLevel,
      keyFilter: parameters?.keyFilter,
      key: parameters?.key,
    },
    schema: z.array(ApplicationPropertySchema),
  };

  return await client.sendRequest(config);
}

/** Returns the properties that are displayed on the "General Configuration > Advanced Settings" page. */
export async function getAdvancedSettings(client: Client): Promise<ApplicationProperty[]> {
  const config: SendRequestOptions<ApplicationProperty[]> = {
    url: '/rest/api/2/application-properties/advanced-settings',
    method: 'GET',
    schema: z.array(ApplicationPropertySchema),
  };

  return await client.sendRequest(config);
}

/** Update an application property via PUT. The "value" field present in the PUT will override the existing value. */
export async function setPropertyViaRestfulTable(
  client: Client,
  parameters: SetPropertyViaRestfulTable,
): Promise<ApplicationProperty> {
  const config: SendRequestOptions<ApplicationProperty> = {
    url: `/rest/api/2/application-properties/${parameters.id}`,
    method: 'PUT',
    schema: ApplicationPropertySchema,
  };

  return await client.sendRequest(config);
}
