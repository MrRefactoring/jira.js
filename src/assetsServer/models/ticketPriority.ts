import { z } from 'zod';
import { apiObject } from '#/core';

export const TicketPrioritySchema = apiObject({
  name: z.string().optional(),
  iconUrl: z.string().optional(),
});

export type TicketPriority = z.infer<typeof TicketPrioritySchema>;
