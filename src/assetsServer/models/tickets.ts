import { z } from 'zod';
import { apiObject } from '#/core';
import { TicketSchema } from './ticket';

export const TicketsSchema = apiObject({
  tickets: z.array(TicketSchema).optional(),
  allTicketsQuery: z.string().optional(),
});

export type Tickets = z.infer<typeof TicketsSchema>;
