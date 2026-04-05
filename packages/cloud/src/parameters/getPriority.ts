import { z } from 'zod';

export const GetPrioritySchema = z.object({
  /** The ID of the issue priority. */
  id: z.string(),
});

export type GetPriority = z.input<typeof GetPrioritySchema>;
