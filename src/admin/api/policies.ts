import { PolicyPageSchema, type PolicyPage } from '../models/policyPage';
import { PolicySchema, type Policy } from '../models/policy';
import type { GetPolicies } from '../parameters/getPolicies';
import type { CreatePolicy } from '../parameters/createPolicy';
import type { GetPolicyById } from '../parameters/getPolicyById';
import type { UpdatePolicy } from '../parameters/updatePolicy';
import type { DeletePolicy } from '../parameters/deletePolicy';
import type { AddResourceToPolicy } from '../parameters/addResourceToPolicy';
import type { UpdatePolicyResource } from '../parameters/updatePolicyResource';
import type { DeletePolicyResource } from '../parameters/deletePolicyResource';
import type { ValidatePolicy } from '../parameters/validatePolicy';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Returns information about org policies */
export async function getPolicies(
  client: Client,
  parameters: GetPolicies,
  options?: RequestOptions,
): Promise<PolicyPage> {
  const config: SendRequestOptions<PolicyPage> = {
    url: `/admin/v1/orgs/${parameters.orgId}/policies`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
      type: parameters.type,
    },
    schema: PolicyPageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Create a policy for an org */
export async function createPolicy(
  client: Client,
  parameters: CreatePolicy,
  options?: RequestOptions,
): Promise<Policy> {
  const config: SendRequestOptions<Policy> = {
    url: `/admin/v1/orgs/${parameters.orgId}/policies`,
    method: 'POST',
    body: {
      data: parameters.data,
    },
    schema: PolicySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns information about a single policy by ID */
export async function getPolicyById(
  client: Client,
  parameters: GetPolicyById,
  options?: RequestOptions,
): Promise<Policy> {
  const config: SendRequestOptions<Policy> = {
    url: `/admin/v1/orgs/${parameters.orgId}/policies/${parameters.policyId}`,
    method: 'GET',
    schema: PolicySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Update a policy for an org */
export async function updatePolicy(
  client: Client,
  parameters: UpdatePolicy,
  options?: RequestOptions,
): Promise<Policy> {
  const config: SendRequestOptions<Policy> = {
    url: `/admin/v1/orgs/${parameters.orgId}/policies/${parameters.policyId}`,
    method: 'PUT',
    body: {
      data: parameters.data,
    },
    schema: PolicySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Delete a policy for an org */
export async function deletePolicy(client: Client, parameters: DeletePolicy, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/admin/v1/orgs/${parameters.orgId}/policies/${parameters.policyId}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Adds a resource to an existing Policy */
export async function addResourceToPolicy(
  client: Client,
  parameters: AddResourceToPolicy,
  options?: RequestOptions,
): Promise<Policy> {
  const config: SendRequestOptions<Policy> = {
    url: `/admin/v1/orgs/${parameters.orgId}/policies/${parameters.policyId}/resources`,
    method: 'POST',
    body: {
      id: parameters.id,
      meta: parameters.meta,
      links: parameters.links,
    },
    schema: PolicySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Update an existing Policy Resource */
export async function updatePolicyResource(
  client: Client,
  parameters: UpdatePolicyResource,
  options?: RequestOptions,
): Promise<Policy> {
  const config: SendRequestOptions<Policy> = {
    url: `/admin/v1/orgs/${parameters.orgId}/policies/${parameters.policyId}/resources/${parameters.resourceId}`,
    method: 'PUT',
    body: {
      meta: parameters.meta,
      links: parameters.links,
    },
    schema: PolicySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Delete an existing Policy Resource */
export async function deletePolicyResource(
  client: Client,
  parameters: DeletePolicyResource,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/admin/v1/orgs/${parameters.orgId}/policies/${parameters.policyId}/resources/${parameters.resourceId}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Validate a policy based on specific requirements. For example, Trigger CDEN validation by pushing a task into the SQS
 * dns-validation queue
 */
export async function validatePolicy(
  client: Client,
  parameters: ValidatePolicy,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/admin/v1/orgs/${parameters.orgId}/policies/${parameters.policyId}/validate`,
    method: 'GET',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
