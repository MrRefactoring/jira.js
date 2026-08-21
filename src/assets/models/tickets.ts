import { z } from 'zod';
import { apiObject } from '#/core';
import { TicketSchema } from './ticket';
/** A list of connected issues */

export const TicketsSchema = apiObject({
  tickets: z.array(TicketSchema).optional(),
  /** A query to find all the connected issues */
  allTicketsQuery: z.string(),
});

export type Tickets = z.infer<typeof TicketsSchema>;
