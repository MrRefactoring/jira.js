import { z } from 'zod';

export const GetStatusSchema = z.object({
  /** A numeric Status id or a status name */
  idOrName: z.string(),
});

export type GetStatus = z.input<typeof GetStatusSchema>;
