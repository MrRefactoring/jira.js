import { CustomFieldSchema, type CustomField } from '../models/customField';
import { BulkDeleteResponseSchema, type BulkDeleteResponse } from '../models/bulkDeleteResponse';
import { CustomFieldOptionsSchema, type CustomFieldOptions } from '../models/customFieldOptions';
import { FieldSchema, type Field } from '../models/field';
import type { GetCustomFields } from '../parameters/getCustomFields';
import type { BulkDeleteCustomFields } from '../parameters/bulkDeleteCustomFields';
import type { GetCustomFieldOptions } from '../parameters/getCustomFieldOptions';
import type { CreateCustomField } from '../parameters/createCustomField';
import type { Client, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Returns a list of Custom Fields in the given range. */
export async function getCustomFields(client: Client, parameters?: GetCustomFields): Promise<CustomField> {
  const config: SendRequestOptions<CustomField> = {
    url: '/rest/api/2/customFields',
    method: 'GET',
    searchParams: {
      sortColumn: parameters?.sortColumn,
      types: parameters?.types,
      search: parameters?.search,
      maxResults: parameters?.maxResults,
      sortOrder: parameters?.sortOrder,
      screenIds: parameters?.screenIds,
      lastValueUpdate: parameters?.lastValueUpdate,
      projectIds: parameters?.projectIds,
      startAt: parameters?.startAt,
    },
    schema: CustomFieldSchema,
  };

  return await client.sendRequest(config);
}

/** Deletes custom fields in bulk. */
export async function bulkDeleteCustomFields(
  client: Client,
  parameters: BulkDeleteCustomFields,
): Promise<BulkDeleteResponse> {
  const config: SendRequestOptions<BulkDeleteResponse> = {
    url: '/rest/api/2/customFields',
    method: 'DELETE',
    searchParams: {
      ids: parameters.ids,
    },
    schema: BulkDeleteResponseSchema,
  };

  return await client.sendRequest(config);
}

/** Returns custom field's options defined in a given context composed of projects and issue types. */
export async function getCustomFieldOptions(
  client: Client,
  parameters: GetCustomFieldOptions,
): Promise<CustomFieldOptions> {
  const config: SendRequestOptions<CustomFieldOptions> = {
    url: `/rest/api/2/customFields/${parameters.customFieldId}/options`,
    method: 'GET',
    searchParams: {
      maxResults: parameters.maxResults,
      issueTypeIds: parameters.issueTypeIds,
      query: parameters.query,
      sortByOptionName: parameters.sortByOptionName,
      useAllContexts: parameters.useAllContexts,
      page: parameters.page,
      projectIds: parameters.projectIds,
    },
    schema: CustomFieldOptionsSchema,
  };

  return await client.sendRequest(config);
}

/** Returns a list of all fields, both System and Custom */
export async function getFields(client: Client): Promise<Field[]> {
  const config: SendRequestOptions<Field[]> = {
    url: '/rest/api/2/field',
    method: 'GET',
    schema: z.array(FieldSchema),
  };

  return await client.sendRequest(config);
}

/** Creates a custom field using a definition */
export async function createCustomField(client: Client, parameters: CreateCustomField): Promise<Field> {
  const config: SendRequestOptions<Field> = {
    url: '/rest/api/2/field',
    method: 'POST',
    body: {
      description: parameters.description,
      id: parameters.id,
      issueTypeIds: parameters.issueTypeIds,
      name: parameters.name,
      projectIds: parameters.projectIds,
      searcherKey: parameters.searcherKey,
      self: parameters.self,
      type: parameters.type,
    },
    schema: FieldSchema,
  };

  return await client.sendRequest(config);
}
