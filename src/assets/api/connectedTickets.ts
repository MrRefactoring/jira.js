import { TicketsSchema, type Tickets } from '../models/tickets';
import type { FindObjectTickets } from '../parameters/findObjectTickets';
import type { Client, SendRequestOptions } from '#/core';

/** Relation between Jira issues and Assets objects */
export async function findObjectTickets(client: Client, parameters: FindObjectTickets): Promise<Tickets> {
  const config: SendRequestOptions<Tickets> = {
    url: `/objectconnectedtickets/${parameters.objectId}/tickets`,
    method: 'GET',
    schema: TicketsSchema,
  };

  return await client.sendRequest(config);
}
