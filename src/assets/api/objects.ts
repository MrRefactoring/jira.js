import { AssetObjectSchema, type AssetObject } from '../models/assetObject';
import { ObjectAttributeSchema, type ObjectAttribute } from '../models/objectAttribute';
import { ObjectHistorySchema, type ObjectHistory } from '../models/objectHistory';
import { ObjectReferenceTypeInfoSchema, type ObjectReferenceTypeInfo } from '../models/objectReferenceTypeInfo';
import {
  ObjectListInclTypeAttributesEntryResultSchema,
  type ObjectListInclTypeAttributesEntryResult,
} from '../models/objectListInclTypeAttributesEntryResult';
import { ObjectAQLTotalCountResultSchema, type ObjectAQLTotalCountResult } from '../models/objectAQLTotalCountResult';
import type { LoadObject } from '../parameters/loadObject';
import type { UpdateObject } from '../parameters/updateObject';
import type { DeleteObject } from '../parameters/deleteObject';
import type { FindObjectAttributes } from '../parameters/findObjectAttributes';
import type { FindObjectHistory } from '../parameters/findObjectHistory';
import type { FindObjectReferenceInfo } from '../parameters/findObjectReferenceInfo';
import type { CreateObject } from '../parameters/createObject';
import type { FindObjectsByAql } from '../parameters/findObjectsByAql';
import type { CountObjectsByAql } from '../parameters/countObjectsByAql';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Load one object */
export async function loadObject(
  client: Client,
  parameters: LoadObject,
  options?: RequestOptions,
): Promise<AssetObject> {
  const config: SendRequestOptions<AssetObject> = {
    url: `/object/${parameters.id}`,
    method: 'GET',
    schema: AssetObjectSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Update an existing object in Assets */
export async function updateObject(
  client: Client,
  parameters: UpdateObject,
  options?: RequestOptions,
): Promise<AssetObject> {
  const config: SendRequestOptions<AssetObject> = {
    url: `/object/${parameters.id}`,
    method: 'PUT',
    body: {
      objectTypeId: parameters.objectTypeId,
      attributes: parameters.attributes,
      hasAvatar: parameters.hasAvatar,
      avatarUUID: parameters.avatarUUID,
    },
    schema: AssetObjectSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Delete the referenced object */
export async function deleteObject(
  client: Client,
  parameters: DeleteObject,
  options?: RequestOptions,
): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/object/${parameters.id}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** List all attributes for the given object */
export async function findObjectAttributes(
  client: Client,
  parameters: FindObjectAttributes,
  options?: RequestOptions,
): Promise<ObjectAttribute[]> {
  const config: SendRequestOptions<ObjectAttribute[]> = {
    url: `/object/${parameters.id}/attributes`,
    method: 'GET',
    schema: z.array(ObjectAttributeSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Retrieve the history entries for this object */
export async function findObjectHistory(
  client: Client,
  parameters: FindObjectHistory,
  options?: RequestOptions,
): Promise<ObjectHistory[]> {
  const config: SendRequestOptions<ObjectHistory[]> = {
    url: `/object/${parameters.id}/history`,
    method: 'GET',
    searchParams: {
      asc: parameters.asc,
    },
    schema: z.array(ObjectHistorySchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Find all references for an object */
export async function findObjectReferenceInfo(
  client: Client,
  parameters: FindObjectReferenceInfo,
  options?: RequestOptions,
): Promise<ObjectReferenceTypeInfo[]> {
  const config: SendRequestOptions<ObjectReferenceTypeInfo[]> = {
    url: `/object/${parameters.id}/referenceinfo`,
    method: 'GET',
    schema: z.array(ObjectReferenceTypeInfoSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Create a new object in Assets */
export async function createObject(
  client: Client,
  parameters: CreateObject,
  options?: RequestOptions,
): Promise<AssetObject> {
  const config: SendRequestOptions<AssetObject> = {
    url: '/object/create',
    method: 'POST',
    body: {
      objectTypeId: parameters.objectTypeId,
      attributes: parameters.attributes,
      hasAvatar: parameters.hasAvatar,
      avatarUUID: parameters.avatarUUID,
    },
    schema: AssetObjectSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Fetch Objects by AQL */
export async function findObjectsByAql(
  client: Client,
  parameters: FindObjectsByAql,
  options?: RequestOptions,
): Promise<ObjectListInclTypeAttributesEntryResult> {
  const config: SendRequestOptions<ObjectListInclTypeAttributesEntryResult> = {
    url: '/object/aql',
    method: 'POST',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
      includeAttributes: parameters.includeAttributes,
    },
    body: {
      qlQuery: parameters.qlQuery,
    },
    schema: ObjectListInclTypeAttributesEntryResultSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * This API provides the total count of objects that match a specified AQL query. Please note that this operation may
 * incur performance latency.
 */
export async function countObjectsByAql(
  client: Client,
  parameters: CountObjectsByAql,
  options?: RequestOptions,
): Promise<ObjectAQLTotalCountResult> {
  const config: SendRequestOptions<ObjectAQLTotalCountResult> = {
    url: '/object/aql/totalcount',
    method: 'POST',
    body: {
      qlQuery: parameters.qlQuery,
    },
    schema: ObjectAQLTotalCountResultSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
