import { WorkspaceDataPolicySchema, type WorkspaceDataPolicy } from '#/models/workspaceDataPolicy';
import { ProjectDataPoliciesSchema, type ProjectDataPolicies } from '#/models/projectDataPolicies';
import { type GetPolicies } from '#/parameters/getPolicies';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/** Returns data policy for the workspace. */
export async function getPolicy(client: Client): Promise<WorkspaceDataPolicy> {
  const config: SendRequestOptions<WorkspaceDataPolicy> = {
    url: '/rest/api/3/data-policy',
    method: 'GET',
    schema: WorkspaceDataPolicySchema,
  };

  return await client.sendRequest(config);
}

/** Returns data policies for the projects specified in the request. */
export async function getPolicies(client: Client, parameters?: GetPolicies): Promise<ProjectDataPolicies> {
  const config: SendRequestOptions<ProjectDataPolicies> = {
    url: '/rest/api/3/data-policy/project',
    method: 'GET',
    searchParams: {
      ids: parameters?.ids,
    },
    schema: ProjectDataPoliciesSchema,
  };

  return await client.sendRequest(config);
}
