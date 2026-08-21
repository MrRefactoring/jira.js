import { AssetObjectSchema, type AssetObject } from '../models/assetObject';
import { ProgressOutSchema, type ProgressOut } from '../models/progressOut';
import { ObjectListResultSchema, type ObjectListResult } from '../models/objectListResult';
import { ObjectAttributeSchema, type ObjectAttribute } from '../models/objectAttribute';
import { ObjectHistorySchema, type ObjectHistory } from '../models/objectHistory';
import { ReferenceTypeObjectInfoSchema, type ReferenceTypeObjectInfo } from '../models/referenceTypeObjectInfo';
import type { GetArchivedObjects } from '../parameters/getArchivedObjects';
import type { ArchiveObject } from '../parameters/archiveObject';
import type { ArchiveObjectsByFilter } from '../parameters/archiveObjectsByFilter';
import type { ArchiveObjectsByIds } from '../parameters/archiveObjectsByIds';
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
import type { Client, SendRequestOptions } from '#/core';

/** Retrieve archived objects. */
export async function getArchivedObjects(client: Client, parameters?: GetArchivedObjects): Promise<AssetObject> {
  const config: SendRequestOptions<AssetObject> = {
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
    schema: AssetObjectSchema,
  };

  return await client.sendRequest(config);
}

/** Archive the referenced object. */
export async function archiveObject(client: Client, parameters: ArchiveObject): Promise<AssetObject> {
  const config: SendRequestOptions<AssetObject> = {
    url: `/rest/assets/1.0/object/archive/${parameters.objectIdentifier}`,
    method: 'PUT',
    schema: AssetObjectSchema,
  };

  return await client.sendRequest(config);
}

/** Bulk archive objects of an object type by filter. */
export async function archiveObjectsByFilter(client: Client, parameters: ArchiveObjectsByFilter): Promise<ProgressOut> {
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
  };

  return await client.sendRequest(config);
}

/** Bulk archive objects across object schemas by object keys asynchronously. */
export async function archiveObjectsByIds(client: Client, parameters: ArchiveObjectsByIds): Promise<ProgressOut> {
  const config: SendRequestOptions<ProgressOut> = {
    url: '/rest/assets/1.0/object/archive/by-keys',
    method: 'POST',
    body: parameters.body,
    schema: ProgressOutSchema,
  };

  return await client.sendRequest(config);
}

/** Restore the referenced object. */
export async function restoreObject(client: Client, parameters: RestoreObject): Promise<AssetObject> {
  const config: SendRequestOptions<AssetObject> = {
    url: `/rest/assets/1.0/object/restore/${parameters.objectIdentifier}`,
    method: 'PUT',
    schema: AssetObjectSchema,
  };

  return await client.sendRequest(config);
}

/** Bulk restore objects by archive search filter. */
export async function restoreObjectsByFilter(client: Client, parameters: RestoreObjectsByFilter): Promise<ProgressOut> {
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
  };

  return await client.sendRequest(config);
}

/** Bulk restore objects by object ids. */
export async function restoreObjectsByIds(client: Client, parameters: RestoreObjectsByIds): Promise<ProgressOut> {
  const config: SendRequestOptions<ProgressOut> = {
    url: '/rest/assets/1.0/object/restore/by-ids',
    method: 'POST',
    body: parameters.body,
    schema: ProgressOutSchema,
  };

  return await client.sendRequest(config);
}

/** Bulk restore objects across object schemas by object keys asynchronously. */
export async function restoreObjectsByKeys(client: Client, parameters: RestoreObjectsByKeys): Promise<ProgressOut> {
  const config: SendRequestOptions<ProgressOut> = {
    url: '/rest/assets/1.0/object/restore/by-keys',
    method: 'POST',
    body: parameters.body,
    schema: ProgressOutSchema,
  };

  return await client.sendRequest(config);
}

/** Set the import source for all objects matching the given IQL criteria. */
export async function bulkSetObjectImportSource(client: Client, parameters: BulkSetObjectImportSource): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/assets/1.0/object/bulk/importSource',
    method: 'POST',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/** Get the current import source ID for an object. */
export async function getObjectImportSource(client: Client, parameters: GetObjectImportSource): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/assets/1.0/object/${parameters.id}/importSource`,
    method: 'GET',
  };

  return await client.sendRequest(config);
}

/** Clear the import source association for an object. */
export async function clearObjectImportSource(client: Client, parameters: ClearObjectImportSource): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/assets/1.0/object/${parameters.id}/importSource`,
    method: 'DELETE',
    searchParams: {
      previousName: parameters.previousName,
    },
  };

  return await client.sendRequest(config);
}

/** Create a new object in Assets. */
export async function createObject(client: Client, parameters: CreateObject): Promise<AssetObject> {
  const config: SendRequestOptions<AssetObject> = {
    url: '/rest/assets/1.0/object/create',
    method: 'POST',
    body: {
      objectTypeId: parameters.objectTypeId,
      attributes: parameters.attributes,
    },
    schema: AssetObjectSchema,
  };

  return await client.sendRequest(config);
}

/** Get an object. */
export async function loadObject(client: Client, parameters: LoadObject): Promise<AssetObject> {
  const config: SendRequestOptions<AssetObject> = {
    url: `/rest/assets/1.0/object/${parameters.id}`,
    method: 'GET',
    searchParams: {
      xoauth_requestor_id: parameters.xoauth_requestor_id,
      includeAttributes: parameters.includeAttributes,
      includeExtendedInfo: parameters.includeExtendedInfo,
    },
    schema: AssetObjectSchema,
  };

  return await client.sendRequest(config);
}

/** Update an existing object in Assets. */
export async function updateObject(client: Client, parameters: UpdateObject): Promise<AssetObject> {
  const config: SendRequestOptions<AssetObject> = {
    url: `/rest/assets/1.0/object/${parameters.id}`,
    method: 'PUT',
    body: {
      objectTypeId: parameters.objectTypeId,
      attributes: parameters.attributes,
    },
    schema: AssetObjectSchema,
  };

  return await client.sendRequest(config);
}

/** Delete the referenced object. */
export async function deleteObject(client: Client, parameters: DeleteObject): Promise<AssetObject> {
  const config: SendRequestOptions<AssetObject> = {
    url: `/rest/assets/1.0/object/${parameters.id}`,
    method: 'DELETE',
    schema: AssetObjectSchema,
  };

  return await client.sendRequest(config);
}

/** Retrieve a list of objects based on an AQL query. */
export async function findObject(client: Client, parameters: FindObject): Promise<ObjectListResult> {
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
  };

  return await client.sendRequest(config);
}

/** Get all attributes for the given object. */
export async function findObjectAttributes(client: Client, parameters: FindObjectAttributes): Promise<ObjectAttribute> {
  const config: SendRequestOptions<ObjectAttribute> = {
    url: `/rest/assets/1.0/object/${parameters.id}/attributes`,
    method: 'GET',
    schema: ObjectAttributeSchema,
  };

  return await client.sendRequest(config);
}

/** Retrieve the history entries for this object. */
export async function findObjectHistory(client: Client, parameters: FindObjectHistory): Promise<ObjectHistory> {
  const config: SendRequestOptions<ObjectHistory> = {
    url: `/rest/assets/1.0/object/${parameters.id}/history`,
    method: 'GET',
    searchParams: {
      asc: parameters.asc,
      abbreviate: parameters.abbreviate,
      orderAsc: parameters.orderAsc,
    },
    schema: ObjectHistorySchema,
  };

  return await client.sendRequest(config);
}

/** Find all inbound references for an object. */
export async function findObjectReferenceInfo(
  client: Client,
  parameters: FindObjectReferenceInfo,
): Promise<ReferenceTypeObjectInfo> {
  const config: SendRequestOptions<ReferenceTypeObjectInfo> = {
    url: `/rest/assets/1.0/object/${parameters.id}/referenceinfo`,
    method: 'GET',
    schema: ReferenceTypeObjectInfoSchema,
  };

  return await client.sendRequest(config);
}
