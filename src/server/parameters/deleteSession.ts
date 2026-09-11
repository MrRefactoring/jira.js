import { z } from 'zod';

export const DeleteSessionSchema = z.object({
  /** A String containing username. */
  username: z.string(),
});

export type DeleteSession = z.input<typeof DeleteSessionSchema>;
