import { z } from 'zod';

export const GetPrioritySchema = z.object({
  /** A String containing the priority id */
  id: z.string(),
});

export type GetPriority = z.input<typeof GetPrioritySchema>;
