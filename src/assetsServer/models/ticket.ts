import { z } from 'zod';
import { apiObject } from '#/core';
import { TicketStatusSchema } from './ticketStatus';
import { TicketTypeSchema } from './ticketType';
import { TicketPrioritySchema } from './ticketPriority';

export const TicketSchema = apiObject({
  key: z.string().optional(),
  id: z.number().optional(),
  reporter: z.string().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  title: z.string().optional(),
  status: TicketStatusSchema.optional(),
  type: TicketTypeSchema.optional(),
  priority: TicketPrioritySchema.optional(),
});

export type Ticket = z.infer<typeof TicketSchema>;
