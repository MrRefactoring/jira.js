import { IssueTypeSchemeListSchema, type IssueTypeSchemeList } from '../models/issueTypeSchemeList';
import { IssueTypeSchemeSchema, type IssueTypeScheme } from '../models/issueTypeScheme';
import { ProjectSchema, type Project } from '../models/project';
import type { CreateIssueTypeScheme } from '../parameters/createIssueTypeScheme';
import type { GetIssueTypeScheme } from '../parameters/getIssueTypeScheme';
import type { UpdateIssueTypeScheme } from '../parameters/updateIssueTypeScheme';
import type { DeleteIssueTypeScheme } from '../parameters/deleteIssueTypeScheme';
import type { GetAssociatedProjects } from '../parameters/getAssociatedProjects';
import type { AddProjectAssociationsToScheme } from '../parameters/addProjectAssociationsToScheme';
import type { SetProjectAssociationsForScheme } from '../parameters/setProjectAssociationsForScheme';
import type { RemoveAllProjectAssociations } from '../parameters/removeAllProjectAssociations';
import type { RemoveProjectAssociation } from '../parameters/removeProjectAssociation';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/**
 * Returns a list of all issue type schemes visible to the user. All issue types associated with the scheme will only be
 * returned if an additional query parameter is provided: expand=schemes.issueTypes. Similarly, the default issue type
 * associated with the scheme (if one exists) will only be returned if an additional query parameter is provided:
 * expand=schemes.defaultIssueType. Note that both query parameters can be used together:
 * expand=schemes.issueTypes,schemes.defaultIssueType.
 */
export async function getAllIssueTypeSchemes(client: Client, options?: RequestOptions): Promise<IssueTypeSchemeList> {
  const config: SendRequestOptions<IssueTypeSchemeList> = {
    url: '/rest/api/2/issuetypescheme',
    method: 'GET',
    schema: IssueTypeSchemeListSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Creates an issue type scheme from a JSON representation */
export async function createIssueTypeScheme(
  client: Client,
  parameters: CreateIssueTypeScheme,
  options?: RequestOptions,
): Promise<IssueTypeScheme> {
  const config: SendRequestOptions<IssueTypeScheme> = {
    url: '/rest/api/2/issuetypescheme',
    method: 'POST',
    body: {
      defaultIssueTypeId: parameters.defaultIssueTypeId,
      description: parameters.description,
      issueTypeIDs: parameters.issueTypeIDs,
      issueTypeIds: parameters.issueTypeIds,
      name: parameters.name,
    },
    schema: IssueTypeSchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns a full representation of the issue type scheme that has the given id */
export async function getIssueTypeScheme(
  client: Client,
  parameters: GetIssueTypeScheme,
  options?: RequestOptions,
): Promise<IssueTypeScheme> {
  const config: SendRequestOptions<IssueTypeScheme> = {
    url: `/rest/api/2/issuetypescheme/${parameters.schemeId}`,
    method: 'GET',
    schema: IssueTypeSchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Updates the specified issue type scheme from a JSON representation */
export async function updateIssueTypeScheme(
  client: Client,
  parameters: UpdateIssueTypeScheme,
  options?: RequestOptions,
): Promise<IssueTypeScheme> {
  const config: SendRequestOptions<IssueTypeScheme> = {
    url: `/rest/api/2/issuetypescheme/${parameters.schemeId}`,
    method: 'PUT',
    body: {
      defaultIssueTypeId: parameters.defaultIssueTypeId,
      description: parameters.description,
      issueTypeIDs: parameters.issueTypeIDs,
      issueTypeIds: parameters.issueTypeIds,
      name: parameters.name,
    },
    schema: IssueTypeSchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes the specified issue type scheme. Any projects associated with this IssueTypeScheme will be automatically
 * associated with the global default IssueTypeScheme.
 */
export async function deleteIssueTypeScheme(
  client: Client,
  parameters: DeleteIssueTypeScheme,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issuetypescheme/${parameters.schemeId}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** For the specified issue type scheme, returns all of the associated projects */
export async function getAssociatedProjects(
  client: Client,
  parameters: GetAssociatedProjects,
  options?: RequestOptions,
): Promise<Project[]> {
  const config: SendRequestOptions<Project[]> = {
    url: `/rest/api/2/issuetypescheme/${parameters.schemeId}/associations`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: z.array(ProjectSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Adds additional projects to those already associated with the specified issue type scheme */
export async function addProjectAssociationsToScheme(
  client: Client,
  parameters: AddProjectAssociationsToScheme,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issuetypescheme/${parameters.schemeId}/associations`,
    method: 'POST',
    body: {
      idsOrKeys: parameters.idsOrKeys,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Associates the given projects with the specified issue type scheme */
export async function setProjectAssociationsForScheme(
  client: Client,
  parameters: SetProjectAssociationsForScheme,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issuetypescheme/${parameters.schemeId}/associations`,
    method: 'PUT',
    body: {
      idsOrKeys: parameters.idsOrKeys,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Removes all project associations for the specified issue type scheme */
export async function removeAllProjectAssociations(
  client: Client,
  parameters: RemoveAllProjectAssociations,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issuetypescheme/${parameters.schemeId}/associations`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** For the specified issue type scheme, removes the given project association */
export async function removeProjectAssociation(
  client: Client,
  parameters: RemoveProjectAssociation,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issuetypescheme/${parameters.schemeId}/associations/${parameters.projIdOrKey}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
