import { z } from 'zod';
import { apiObject } from '#/core';
import { TicketStatusSchema } from './ticketStatus';
import { TicketTypeSchema } from './ticketType';
import { TicketPrioritySchema } from './ticketPriority';

export const TicketSchema = apiObject({
  workspaceId: z.string(),
  globalId: z.string(),
  key: z.string().optional(),
  id: z.string(),
  reporter: z.string(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
  title: z.string().optional(),
  status: TicketStatusSchema.optional(),
  type: TicketTypeSchema,
  priority: TicketPrioritySchema,
});

export type Ticket = z.infer<typeof TicketSchema>;
