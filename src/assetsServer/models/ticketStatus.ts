import { z } from 'zod';
import { apiObject } from '#/core';

export const TicketStatusSchema = apiObject({
  name: z.string().optional(),
  description: z.string().optional(),
  colorName: z.string().optional(),
});

export type TicketStatus = z.infer<typeof TicketStatusSchema>;
