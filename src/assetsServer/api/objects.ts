import { ArchivedObjectsPageSchema, type ArchivedObjectsPage } from '../models/archivedObjectsPage';
import { AssetObjectSchema, type AssetObject } from '../models/assetObject';
import { ProgressOutSchema, type ProgressOut } from '../models/progressOut';
import { ObjectListResultSchema, type ObjectListResult } from '../models/objectListResult';
import { ObjectAttributeSchema, type ObjectAttribute } from '../models/objectAttribute';
import { ObjectHistorySchema, type ObjectHistory } from '../models/objectHistory';
import { ReferenceTypeObjectInfoSchema, type ReferenceTypeObjectInfo } from '../models/referenceTypeObjectInfo';
import type { GetArchivedObjects } from '../parameters/getArchivedObjects';
import type { ArchiveObject } from '../parameters/archiveObject';
import type { ArchiveObjectsByFilter } from '../parameters/archiveObjectsByFilter';
import type { ArchiveObjectsByKeys } from '../parameters/archiveObjectsByKeys';
import type { RestoreObject } from '../parameters/restoreObject';
import type { RestoreObjectsByFilter } from '../parameters/restoreObjectsByFilter';
import type { RestoreObjectsByIds } from '../parameters/restoreObjectsByIds';
import type { RestoreObjectsByKeys } from '../parameters/restoreObjectsByKeys';
import type { BulkSetObjectImportSource } from '../parameters/bulkSetObjectImportSource';
import type { GetObjectImportSource } from '../parameters/getObjectImportSource';
import type { ClearObjectImportSource } from '../parameters/clearObjectImportSource';
import type { CreateObject } from '../parameters/createObject';
import type { LoadObject } from '../parameters/loadObject';
import type { UpdateObject } from '../parameters/updateObject';
import type { DeleteObject } from '../parameters/deleteObject';
import type { FindObject } from '../parameters/findObject';
import type { FindObjectAttributes } from '../parameters/findObjectAttributes';
import type { FindObjectHistory } from '../parameters/findObjectHistory';
import type { FindObjectReferenceInfo } from '../parameters/findObjectReferenceInfo';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Retrieve archived objects. */
export async function getArchivedObjects(
  client: Client,
  parameters?: GetArchivedObjects,
  options?: RequestOptions,
): Promise<ArchivedObjectsPage> {
  const config: SendRequestOptions<ArchivedObjectsPage> = {
    url: '/rest/assets/1.0/object/archived',
    method: 'GET',
    searchParams: {
      objectSchemaId: parameters?.objectSchemaId,
      archivedFromDate: parameters?.archivedFromDate,
      offset: parameters?.offset,
      objectTypeIds: parameters?.objectTypeIds,
      limit: parameters?.limit,
      archivedToDate: parameters?.archivedToDate,
      archivedBy: parameters?.archivedBy,
    },
    schema: ArchivedObjectsPageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Archive the referenced object. */
export async function archiveObject(
  client: Client,
  parameters: ArchiveObject,
  options?: RequestOptions,
): Promise<AssetObject> {
  const config: SendRequestOptions<AssetObject> = {
    url: `/rest/assets/1.0/object/archive/${parameters.objectIdentifier}`,
    method: 'PUT',
    schema: AssetObjectSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Bulk archive objects of an object type by filter. */
export async function archiveObjectsByFilter(
  client: Client,
  parameters: ArchiveObjectsByFilter,
  options?: RequestOptions,
): Promise<ProgressOut> {
  const config: SendRequestOptions<ProgressOut> = {
    url: '/rest/assets/1.0/object/archive/by-filter',
    method: 'POST',
    searchParams: {
      typeId: parameters.typeId,
    },
    body: {
      objectSchemaId: parameters.objectSchemaId,
      qlQuerySearch: parameters.qlQuerySearch,
      qlQueryParams: parameters.qlQueryParams,
      filterParams: parameters.filterParams,
      iqlSearch: parameters.iqlSearch,
      iqlParams: parameters.iqlParams,
    },
    schema: ProgressOutSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Bulk archive objects across object schemas by object keys asynchronously. */
export async function archiveObjectsByKeys(
  client: Client,
  parameters: ArchiveObjectsByKeys,
  options?: RequestOptions,
): Promise<ProgressOut> {
  const config: SendRequestOptions<ProgressOut> = {
    url: '/rest/assets/1.0/object/archive/by-keys',
    method: 'POST',
    body: parameters.body,
    schema: ProgressOutSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Restore the referenced object. */
export async function restoreObject(
  client: Client,
  parameters: RestoreObject,
  options?: RequestOptions,
): Promise<AssetObject> {
  const config: SendRequestOptions<AssetObject> = {
    url: `/rest/assets/1.0/object/restore/${parameters.objectIdentifier}`,
    method: 'PUT',
    schema: AssetObjectSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Bulk restore objects by archive search filter. */
export async function restoreObjectsByFilter(
  client: Client,
  parameters: RestoreObjectsByFilter,
  options?: RequestOptions,
): Promise<ProgressOut> {
  const config: SendRequestOptions<ProgressOut> = {
    url: '/rest/assets/1.0/object/restore/by-filter',
    method: 'POST',
    searchParams: {
      objectSchemaId: parameters.objectSchemaId,
      archivedFromDate: parameters.archivedFromDate,
      objectTypeIds: parameters.objectTypeIds,
      archivedToDate: parameters.archivedToDate,
      archivedBy: parameters.archivedBy,
    },
    schema: ProgressOutSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Bulk restore objects by object ids. */
export async function restoreObjectsByIds(
  client: Client,
  parameters: RestoreObjectsByIds,
  options?: RequestOptions,
): Promise<ProgressOut> {
  const config: SendRequestOptions<ProgressOut> = {
    url: '/rest/assets/1.0/object/restore/by-ids',
    method: 'POST',
    body: parameters.body,
    schema: ProgressOutSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Bulk restore objects across object schemas by object keys asynchronously. */
export async function restoreObjectsByKeys(
  client: Client,
  parameters: RestoreObjectsByKeys,
  options?: RequestOptions,
): Promise<ProgressOut> {
  const config: SendRequestOptions<ProgressOut> = {
    url: '/rest/assets/1.0/object/restore/by-keys',
    method: 'POST',
    body: parameters.body,
    schema: ProgressOutSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Set the import source for all objects matching the given IQL criteria. */
export async function bulkSetObjectImportSource(
  client: Client,
  parameters: BulkSetObjectImportSource,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/assets/1.0/object/bulk/importSource',
    method: 'POST',
    body: parameters.body,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Get the current import source ID for an object. */
export async function getObjectImportSource(
  client: Client,
  parameters: GetObjectImportSource,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/assets/1.0/object/${parameters.id}/importSource`,
    method: 'GET',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Clear the import source association for an object. */
export async function clearObjectImportSource(
  client: Client,
  parameters: ClearObjectImportSource,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/assets/1.0/object/${parameters.id}/importSource`,
    method: 'DELETE',
    searchParams: {
      previousName: parameters.previousName,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Create a new object in Assets. */
export async function createObject(
  client: Client,
  parameters: CreateObject,
  options?: RequestOptions,
): Promise<AssetObject> {
  const config: SendRequestOptions<AssetObject> = {
    url: '/rest/assets/1.0/object/create',
    method: 'POST',
    body: {
      objectTypeId: parameters.objectTypeId,
      attributes: parameters.attributes,
    },
    schema: AssetObjectSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Get an object. */
export async function loadObject(
  client: Client,
  parameters: LoadObject,
  options?: RequestOptions,
): Promise<AssetObject> {
  const config: SendRequestOptions<AssetObject> = {
    url: `/rest/assets/1.0/object/${parameters.id}`,
    method: 'GET',
    searchParams: {
      xoauth_requestor_id: parameters.xoauth_requestor_id,
      includeAttributes: parameters.includeAttributes,
      includeExtendedInfo: parameters.includeExtendedInfo,
    },
    schema: AssetObjectSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Update an existing object in Assets. */
export async function updateObject(
  client: Client,
  parameters: UpdateObject,
  options?: RequestOptions,
): Promise<AssetObject> {
  const config: SendRequestOptions<AssetObject> = {
    url: `/rest/assets/1.0/object/${parameters.id}`,
    method: 'PUT',
    body: {
      objectTypeId: parameters.objectTypeId,
      attributes: parameters.attributes,
    },
    schema: AssetObjectSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Delete the referenced object. */
export async function deleteObject(
  client: Client,
  parameters: DeleteObject,
  options?: RequestOptions,
): Promise<AssetObject> {
  const config: SendRequestOptions<AssetObject> = {
    url: `/rest/assets/1.0/object/${parameters.id}`,
    method: 'DELETE',
    schema: AssetObjectSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Retrieve a list of objects based on an AQL query. */
export async function findObject(
  client: Client,
  parameters: FindObject,
  options?: RequestOptions,
): Promise<ObjectListResult> {
  const config: SendRequestOptions<ObjectListResult> = {
    url: '/rest/assets/1.0/object/navlist/aql',
    method: 'POST',
    body: {
      page: parameters.page,
      asc: parameters.asc,
      objectTypeId: parameters.objectTypeId,
      objectId: parameters.objectId,
      objectSchemaId: parameters.objectSchemaId,
      qlQuery: parameters.qlQuery,
      resultsPerPage: parameters.resultsPerPage,
      orderByTypeAttrId: parameters.orderByTypeAttrId,
      includeAttributes: parameters.includeAttributes,
      attributesToDisplay: parameters.attributesToDisplay,
      iql: parameters.iql,
    },
    schema: ObjectListResultSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Get all attributes for the given object. */
export async function findObjectAttributes(
  client: Client,
  parameters: FindObjectAttributes,
  options?: RequestOptions,
): Promise<ObjectAttribute[]> {
  const config: SendRequestOptions<ObjectAttribute[]> = {
    url: `/rest/assets/1.0/object/${parameters.id}/attributes`,
    method: 'GET',
    schema: z.array(ObjectAttributeSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Retrieve the history entries for this object. */
export async function findObjectHistory(
  client: Client,
  parameters: FindObjectHistory,
  options?: RequestOptions,
): Promise<ObjectHistory[]> {
  const config: SendRequestOptions<ObjectHistory[]> = {
    url: `/rest/assets/1.0/object/${parameters.id}/history`,
    method: 'GET',
    searchParams: {
      asc: parameters.asc,
      abbreviate: parameters.abbreviate,
      orderAsc: parameters.orderAsc,
    },
    schema: z.array(ObjectHistorySchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Find all inbound references for an object. */
export async function findObjectReferenceInfo(
  client: Client,
  parameters: FindObjectReferenceInfo,
  options?: RequestOptions,
): Promise<ReferenceTypeObjectInfo[]> {
  const config: SendRequestOptions<ReferenceTypeObjectInfo[]> = {
    url: `/rest/assets/1.0/object/${parameters.id}/referenceinfo`,
    method: 'GET',
    schema: z.array(ReferenceTypeObjectInfoSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
