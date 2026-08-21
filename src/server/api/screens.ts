import { ScreenSchema, type Screen } from '../models/screen';
import { ScreenableFieldSchema, type ScreenableField } from '../models/screenableField';
import { ScreenableTabSchema, type ScreenableTab } from '../models/screenableTab';
import type { GetAllScreens } from '../parameters/getAllScreens';
import type { AddFieldToDefaultScreen } from '../parameters/addFieldToDefaultScreen';
import type { GetFieldsToAdd } from '../parameters/getFieldsToAdd';
import type { GetAllTabs } from '../parameters/getAllTabs';
import type { AddTab } from '../parameters/addTab';
import type { RenameTab } from '../parameters/renameTab';
import type { DeleteTab } from '../parameters/deleteTab';
import type { GetAllFields } from '../parameters/getAllFields';
import type { AddField } from '../parameters/addField';
import type { RemoveField } from '../parameters/removeField';
import type { MoveField } from '../parameters/moveField';
import type { UpdateShowWhenEmptyIndicator } from '../parameters/updateShowWhenEmptyIndicator';
import type { MoveTab } from '../parameters/moveTab';
import type { Client, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Adds field or custom field to the default tab. */
export async function getAllScreens(client: Client, parameters?: GetAllScreens): Promise<Screen[]> {
  const config: SendRequestOptions<Screen[]> = {
    url: '/rest/api/2/screens',
    method: 'GET',
    searchParams: {
      search: parameters?.search,
      expand: parameters?.expand,
      maxResults: parameters?.maxResults,
      startAt: parameters?.startAt,
    },
    schema: z.array(ScreenSchema),
  };

  return await client.sendRequest(config);
}

/** Moves field on the given tab. */
export async function addFieldToDefaultScreen(client: Client, parameters: AddFieldToDefaultScreen): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/screens/addToDefault/${parameters.fieldId}`,
    method: 'POST',
  };

  return await client.sendRequest(config);
}

/** Gets available fields for screen. i.e ones that haven't already been added. */
export async function getFieldsToAdd(client: Client, parameters: GetFieldsToAdd): Promise<ScreenableField[]> {
  const config: SendRequestOptions<ScreenableField[]> = {
    url: `/rest/api/2/screens/${parameters.screenId}/availableFields`,
    method: 'GET',
    schema: z.array(ScreenableFieldSchema),
  };

  return await client.sendRequest(config);
}

/** Returns a list of all tabs for the given screen. */
export async function getAllTabs(client: Client, parameters: GetAllTabs): Promise<ScreenableTab[]> {
  const config: SendRequestOptions<ScreenableTab[]> = {
    url: `/rest/api/2/screens/${parameters.screenId}/tabs`,
    method: 'GET',
    searchParams: {
      projectKey: parameters.projectKey,
    },
    schema: z.array(ScreenableTabSchema),
  };

  return await client.sendRequest(config);
}

/** Creates tab for given screen. */
export async function addTab(client: Client, parameters: AddTab): Promise<ScreenableTab> {
  const config: SendRequestOptions<ScreenableTab> = {
    url: `/rest/api/2/screens/${parameters.screenId}/tabs`,
    method: 'POST',
    body: {
      id: parameters.id,
      name: parameters.name,
    },
    schema: ScreenableTabSchema,
  };

  return await client.sendRequest(config);
}

/** Renames tab on given screen. */
export async function renameTab(client: Client, parameters: RenameTab): Promise<ScreenableTab> {
  const config: SendRequestOptions<ScreenableTab> = {
    url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}`,
    method: 'PUT',
    body: {
      id: parameters.id,
      name: parameters.name,
    },
    schema: ScreenableTabSchema,
  };

  return await client.sendRequest(config);
}

/** Deletes tab from given screen. */
export async function deleteTab(client: Client, parameters: DeleteTab): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/** Gets all fields for a given tab. */
export async function getAllFields(client: Client, parameters: GetAllFields): Promise<ScreenableField[]> {
  const config: SendRequestOptions<ScreenableField[]> = {
    url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields`,
    method: 'GET',
    searchParams: {
      projectKey: parameters.projectKey,
    },
    schema: z.array(ScreenableFieldSchema),
  };

  return await client.sendRequest(config);
}

/** Adds field to the given tab. */
export async function addField(client: Client, parameters: AddField): Promise<ScreenableField> {
  const config: SendRequestOptions<ScreenableField> = {
    url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields`,
    method: 'POST',
    body: {
      fieldId: parameters.fieldId,
    },
    schema: ScreenableFieldSchema,
  };

  return await client.sendRequest(config);
}

/** Removes field from given tab. */
export async function removeField(client: Client, parameters: RemoveField): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields/${parameters.id}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/** Moves field on the given tab. */
export async function moveField(client: Client, parameters: MoveField): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields/${parameters.id}/move`,
    method: 'POST',
    body: {
      after: parameters.after,
      position: parameters.position,
    },
  };

  return await client.sendRequest(config);
}

/** Update 'showWhenEmptyIndicator' for given field on screen. */
export async function updateShowWhenEmptyIndicator(
  client: Client,
  parameters: UpdateShowWhenEmptyIndicator,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields/${parameters.id}/updateShowWhenEmptyIndicator/${parameters.newValue}`,
    method: 'PUT',
  };

  return await client.sendRequest(config);
}

/** Moves tab position. */
export async function moveTab(client: Client, parameters: MoveTab): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/move/${parameters.pos}`,
    method: 'POST',
  };

  return await client.sendRequest(config);
}
