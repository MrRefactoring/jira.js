import { z } from 'zod';
import { apiObject } from '#/core';

export const TicketTypeSchema = apiObject({
  name: z.string().optional(),
  description: z.string().optional(),
  iconUrl: z.string().optional(),
});

export type TicketType = z.infer<typeof TicketTypeSchema>;
