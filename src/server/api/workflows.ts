import { WorkflowSchema, type Workflow } from '../models/workflow';
import type { GetAllWorkflows } from '../parameters/getAllWorkflows';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/**
 * Returns all workflows. The “lastModifiedDate” is returned in Jira Complete Date/Time Format (dd/MMM/yy h:mm by
 * default), but can also be returned as a relative date.
 */
export async function getAllWorkflows(
  client: Client,
  parameters?: GetAllWorkflows,
  options?: RequestOptions,
): Promise<Workflow[]> {
  const config: SendRequestOptions<Workflow[]> = {
    url: '/rest/api/2/workflow',
    method: 'GET',
    searchParams: {
      workflowName: parameters?.workflowName,
    },
    schema: z.array(WorkflowSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
