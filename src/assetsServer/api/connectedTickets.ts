import { TicketsSchema, type Tickets } from '../models/tickets';
import type { FindObjectTickets } from '../parameters/findObjectTickets';
import type { Client, SendRequestOptions } from '#/core';

/** Retrieve all tickets connected to the specified object. */
export async function findObjectTickets(client: Client, parameters: FindObjectTickets): Promise<Tickets> {
  const config: SendRequestOptions<Tickets> = {
    url: `/rest/assets/1.0/objectconnectedtickets/${parameters.id}/tickets`,
    method: 'GET',
    searchParams: {
      filterId: parameters.filterId,
      xoauth_requestor_id: parameters.xoauth_requestor_id,
      limit: parameters.limit,
    },
    schema: TicketsSchema,
  };

  return await client.sendRequest(config);
}
