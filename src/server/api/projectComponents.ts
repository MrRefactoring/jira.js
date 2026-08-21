import { ComponentSchema, type Component } from '../models/component';
import { PagedResultsSchema, type PagedResults } from '../models/pagedResults';
import { ComponentIssueCountsSchema, type ComponentIssueCounts } from '../models/componentIssueCounts';
import type { CreateComponent } from '../parameters/createComponent';
import type { GetPaginatedComponents } from '../parameters/getPaginatedComponents';
import type { GetComponent } from '../parameters/getComponent';
import type { UpdateComponent } from '../parameters/updateComponent';
import type { DeleteComponent } from '../parameters/deleteComponent';
import type { GetComponentRelatedIssues } from '../parameters/getComponentRelatedIssues';
import type { Client, SendRequestOptions } from '#/core';

/** Create a component via POST. */
export async function createComponent(client: Client, parameters: CreateComponent): Promise<Component> {
  const config: SendRequestOptions<Component> = {
    url: '/rest/api/2/component',
    method: 'POST',
    body: {
      archived: parameters.archived,
      assigneeType: parameters.assigneeType,
      deleted: parameters.deleted,
      description: parameters.description,
      id: parameters.id,
      lead: parameters.lead,
      leadUserName: parameters.leadUserName,
      name: parameters.name,
      project: parameters.project,
      self: parameters.self,
    },
    schema: ComponentSchema,
  };

  return await client.sendRequest(config);
}

/** Returns paginated list of filtered active components */
export async function getPaginatedComponents(
  client: Client,
  parameters?: GetPaginatedComponents,
): Promise<PagedResults> {
  const config: SendRequestOptions<PagedResults> = {
    url: '/rest/api/2/component/page',
    method: 'GET',
    searchParams: {
      maxResults: parameters?.maxResults,
      query: parameters?.query,
      projectIds: parameters?.projectIds,
      startAt: parameters?.startAt,
    },
    schema: PagedResultsSchema,
  };

  return await client.sendRequest(config);
}

/** Returns a project component. */
export async function getComponent(client: Client, parameters: GetComponent): Promise<Component> {
  const config: SendRequestOptions<Component> = {
    url: `/rest/api/2/component/${parameters.id}`,
    method: 'GET',
    schema: ComponentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Modify a component via PUT. Any fields present in the PUT will override existing values. As a convenience, if a field
 * is not present, it is silently ignored.
 */
export async function updateComponent(client: Client, parameters: UpdateComponent): Promise<Component> {
  const config: SendRequestOptions<Component> = {
    url: `/rest/api/2/component/${parameters.id}`,
    method: 'PUT',
    body: parameters.body,
    schema: ComponentSchema,
  };

  return await client.sendRequest(config);
}

/** Delete a project component. */
export async function deleteComponent(client: Client, parameters: DeleteComponent): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/component/${parameters.id}`,
    method: 'DELETE',
    searchParams: {
      moveIssuesTo: parameters.moveIssuesTo,
    },
  };

  return await client.sendRequest(config);
}

/** Returns counts of issues related to this component. */
export async function getComponentRelatedIssues(
  client: Client,
  parameters: GetComponentRelatedIssues,
): Promise<ComponentIssueCounts> {
  const config: SendRequestOptions<ComponentIssueCounts> = {
    url: `/rest/api/2/component/${parameters.id}/relatedIssueCounts`,
    method: 'GET',
    schema: ComponentIssueCountsSchema,
  };

  return await client.sendRequest(config);
}
