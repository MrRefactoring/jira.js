import { ScimGroupSchema, type ScimGroup } from '../models/scimGroup';
import { ScimGroupListResponseSchema, type ScimGroupListResponse } from '../models/scimGroupListResponse';
import type { GetGroup } from '../parameters/getGroup';
import type { ReplaceGroup } from '../parameters/replaceGroup';
import type { DeleteGroup } from '../parameters/deleteGroup';
import type { PatchGroup } from '../parameters/patchGroup';
import type { GetGroups } from '../parameters/getGroups';
import type { CreateGroup } from '../parameters/createGroup';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Gets the details of a group based on the id. */
export async function getGroup(client: Client, parameters: GetGroup, options?: RequestOptions): Promise<ScimGroup> {
  const config: SendRequestOptions<ScimGroup> = {
    url: `/scim/directory/${parameters.directoryId}/Groups/${parameters.id}`,
    method: 'GET',
    schema: ScimGroupSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Updates the details of a group with its unique ID. */
export async function replaceGroup(
  client: Client,
  parameters: ReplaceGroup,
  options?: RequestOptions,
): Promise<ScimGroup> {
  const config: SendRequestOptions<ScimGroup> = {
    url: `/scim/directory/${parameters.directoryId}/Groups/${parameters.id}`,
    method: 'PUT',
    body: parameters.body,
    schema: ScimGroupSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a group to remove the group from the organization's directory.
 *
 * **Note**: An attempt to delete a non-existent group will fail with a 404 (Resource Not found) error.
 *
 * **Note**: Deleting a synced group from your identity provider will delete the group from your organization's
 * directory and associated sites.
 *
 * 1. If this group is used for allocating product license (granting role in a product), then members of this group may
 *    lose access to corresponding product after group deletion.
 * 2. If this group is used to grant permissions in product, then members of this group may lose their permissions in the
 *    corresponding product.
 */
export async function deleteGroup(client: Client, parameters: DeleteGroup, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/scim/directory/${parameters.directoryId}/Groups/${parameters.id}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a group's information in the directory and manages group membership.
 *
 * **Note:** Renaming groups after they've synced to your Atlassian organization isn't supported in this release of User
 * Provisioning API. To rename a group, create a new group with the desired name, update membership, and then delete the
 * old group.
 *
 * #### Example
 *
 * Some HTTP headers omitted and JSON payloads formatted for readability.
 *
 *     # Request
 *     PATCH /scim/directory/2fb21891-7bee-4c2d-a61a-ade3834c8b2b/Groups/50202593-bc47-45df-8fa0-3f63343aa3c1 HTTP/1.1
 *     Accept: application/scim+json
 *     Accept-Charset: utf-8
 *     Content-Type: application/scim+json; charset=utf-8
 *     Authorization: Bearer 0j6lDgrjU7HmGagocgLe
 *     Host: api.atlassian.com
 *
 *     {
 *        "schemas":[
 *           "urn:ietf:params:scim:api:messages:2.0:PatchOp"
 *        ],
 *        "Operations":[
 *           {
 *              "op":"add",
 *              "path":"members",
 *              "value":[
 *                 {
 *                    "value":"c6993c94-dbda-40f1-b6f0-18c855522ade",
 *                    "display":"dave.meyer@demotime.authteam.com"
 *                 },
 *                 {
 *                    "value":"f0ae48f7-1466-445e-85ea-e83ef754aefd",
 *                    "display":"lingbo.lu@demotime.authteam.com"
 *                 },
 *                 {
 *                    "value":"432d6f10-2e28-454e-be99-0f8c732a046f",
 *                    "display":"joanna@demotime.authteam.com"
 *                 }
 *              ]
 *           }
 *        ]
 *     }
 *
 *     # Response
 *     HTTP/1.1 200
 *     Content-Type: application/scim+json
 *
 *     {
 *        "schemas":[
 *           "urn:ietf:params:scim:schemas:core:2.0:Group"
 *        ],
 *        "id":"50202593-bc47-45df-8fa0-3f63343aa3c1",
 *        "displayName":"demotime-confluence-users",
 *        "members":[
 *           {
 *              "type":"User",
 *              "value":"f0ae48f7-1466-445e-85ea-e83ef754aefd",
 *              "display":"lingbo.lu@demotime.authteam.com",
 *              "$ref":"https://api.atlassian.com/scim/directory/2fb21891-7bee-4c2d-a61a-ade3834c8b2b/Users/f0ae48f7-1466-445e-85ea-e83ef754aefd"
 *           },
 *           {
 *              "type":"User",
 *              "value":"c6993c94-dbda-40f1-b6f0-18c855522ade",
 *              "display":"dave.meyer@demotime.authteam.com",
 *              "$ref":"https://api.atlassian.com/scim/directory/2fb21891-7bee-4c2d-a61a-ade3834c8b2b/Users/c6993c94-dbda-40f1-b6f0-18c855522ade"
 *           },
 *           {
 *              "type":"User",
 *              "value":"432d6f10-2e28-454e-be99-0f8c732a046f",
 *              "display":"joanna@demotime.authteam.com",
 *              "$ref":"https://api.atlassian.com/scim/directory/2fb21891-7bee-4c2d-a61a-ade3834c8b2b/Users/432d6f10-2e28-454e-be99-0f8c732a046f"
 *           }
 *        ],
 *        "meta":{
 *           "resourceType":"Group",
 *           "location":"https://api.atlassian.com/scim/directory/2fb21891-7bee-4c2d-a61a-ade3834c8b2b/Groups/50202593-bc47-45df-8fa0-3f63343aa3c1",
 *           "lastModified":"2018-09-26T17:49:09.420654Z",
 *           "created":"2018-09-26T17:41:35.49073Z"
 *        }
 *     }
 */
export async function patchGroup(client: Client, parameters: PatchGroup, options?: RequestOptions): Promise<ScimGroup> {
  const config: SendRequestOptions<ScimGroup> = {
    url: `/scim/directory/${parameters.directoryId}/Groups/${parameters.id}`,
    method: 'PATCH',
    body: {
      schemas: parameters.schemas,
      operations: parameters.operations,
    },
    schema: ScimGroupSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Get groups from the directory. Filter the groups by name supported with a single exact match (`eq`) against the
 * `displayName` attribute.
 *
 * **Note**: While this API enables pagination, sorting functionality is not supported.
 */
export async function getGroups(
  client: Client,
  parameters: GetGroups,
  options?: RequestOptions,
): Promise<ScimGroupListResponse> {
  const config: SendRequestOptions<ScimGroupListResponse> = {
    url: `/scim/directory/${parameters.directoryId}/Groups`,
    method: 'GET',
    searchParams: {
      filter: parameters.filter,
      startIndex: parameters.startIndex,
      count: parameters.count,
    },
    schema: ScimGroupListResponseSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a read-only group in the organization's directory. You can only edit groups from your identity provider.
 *
 * **Note:** An attempt to create a group with an existing name will fail with a 409 (Conflict) error.
 */
export async function createGroup(
  client: Client,
  parameters: CreateGroup,
  options?: RequestOptions,
): Promise<ScimGroup> {
  const config: SendRequestOptions<ScimGroup> = {
    url: `/scim/directory/${parameters.directoryId}/Groups`,
    method: 'POST',
    body: parameters.body,
    schema: ScimGroupSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
