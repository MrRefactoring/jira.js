import { z } from 'zod';

export const GetStatusSchema = z.object({
  /** The ID or name of the status. */
  idOrName: z.string(),
});

export type GetStatus = z.input<typeof GetStatusSchema>;
