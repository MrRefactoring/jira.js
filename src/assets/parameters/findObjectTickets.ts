import { z } from 'zod';

export const FindObjectTicketsSchema = z.object({
  /** The id of the object to get connected tickets for */
  objectId: z.string(),
});

export type FindObjectTickets = z.input<typeof FindObjectTicketsSchema>;
