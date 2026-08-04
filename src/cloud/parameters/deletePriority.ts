import { z } from 'zod';

export const DeletePrioritySchema = z.object({
  /** The ID of the issue priority. */
  id: z.string(),
});

export type DeletePriority = z.input<typeof DeletePrioritySchema>;
