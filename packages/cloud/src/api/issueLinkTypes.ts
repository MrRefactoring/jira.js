import { IssueLinkTypesSchema, type IssueLinkTypes } from '#/models/issueLinkTypes';
import { IssueLinkTypeSchema, type IssueLinkType } from '#/models/issueLinkType';
import { type CreateIssueLinkType } from '#/parameters/createIssueLinkType';
import { type GetIssueLinkType } from '#/parameters/getIssueLinkType';
import { type UpdateIssueLinkType } from '#/parameters/updateIssueLinkType';
import { type DeleteIssueLinkType } from '#/parameters/deleteIssueLinkType';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns a list of all issue link types.
 *
 * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for a project in the site.
 */
export async function getIssueLinkTypes(client: Client): Promise<IssueLinkTypes> {
  const config: SendRequestOptions<IssueLinkTypes> = {
    url: '/rest/api/3/issueLinkType',
    method: 'GET',
    schema: IssueLinkTypesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates an issue link type. Use this operation to create descriptions of the reasons why issues are linked. The issue
 * link type consists of a name and descriptions for a link's inward and outward relationships.
 *
 * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function createIssueLinkType(client: Client, parameters: CreateIssueLinkType): Promise<IssueLinkType> {
  const config: SendRequestOptions<IssueLinkType> = {
    url: '/rest/api/3/issueLinkType',
    method: 'POST',
    body: {
      id: parameters.id,
      inward: parameters.inward,
      name: parameters.name,
      outward: parameters.outward,
      self: parameters.self,
    },
    schema: IssueLinkTypeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns an issue link type.
 *
 * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for a project in the site.
 */
export async function getIssueLinkType(client: Client, parameters: GetIssueLinkType): Promise<IssueLinkType> {
  const config: SendRequestOptions<IssueLinkType> = {
    url: `/rest/api/3/issueLinkType/${parameters.issueLinkTypeId}`,
    method: 'GET',
    schema: IssueLinkTypeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates an issue link type.
 *
 * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function updateIssueLinkType(client: Client, parameters: UpdateIssueLinkType): Promise<IssueLinkType> {
  const config: SendRequestOptions<IssueLinkType> = {
    url: `/rest/api/3/issueLinkType/${parameters.issueLinkTypeId}`,
    method: 'PUT',
    body: {
      id: parameters.id,
      inward: parameters.inward,
      name: parameters.name,
      outward: parameters.outward,
      self: parameters.self,
    },
    schema: IssueLinkTypeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes an issue link type.
 *
 * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteIssueLinkType(client: Client, parameters: DeleteIssueLinkType): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issueLinkType/${parameters.issueLinkTypeId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
