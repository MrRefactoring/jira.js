import { PagedCustomerTransitionSchema } from '../models/pagedCustomerTransition';
import type { Page } from '../models/page';
import type { CustomerTransition } from '../models/customerTransition';
import type { GetCustomerTransitions } from '../parameters/getCustomerTransitions';
import type { PerformCustomerTransition } from '../parameters/performCustomerTransition';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns a list of transitions that customers can perform on the request.
 *
 * **Permissions:**
 *
 * The calling user must be able to view the request.
 */
export async function getCustomerTransitions(
  client: Client,
  parameters: GetCustomerTransitions,
): Promise<Page<CustomerTransition>> {
  const config: SendRequestOptions<Page<CustomerTransition>> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/transition`,
    method: 'GET',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: PagedCustomerTransitionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Perform a customer transition for a given request and transition ID. An optional comment can be included to provide a
 * reason for the transition.**Permissions:** The calling user must be able to view the request and have the Transition
 * Issues permission.If an additional comment is passed the calling user must also have the Add Comments permission.
 */
export async function performCustomerTransition(client: Client, parameters: PerformCustomerTransition): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/transition`,
    method: 'POST',
    body: {
      id: parameters.id,
      additionalComment: parameters.additionalComment,
    },
  };

  return await client.sendRequest(config);
}
