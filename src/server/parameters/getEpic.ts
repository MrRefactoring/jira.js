import { z } from 'zod';

export const GetEpicSchema = z.object({
  /** The id or key of the requested epic. */
  epicIdOrKey: z.string(),
});

export type GetEpic = z.input<typeof GetEpicSchema>;
