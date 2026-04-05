import { z } from 'zod';

/** The ID of an issue priority. */
export const PriorityIdSchema = z.object({
  /** The ID of the issue priority. */
  id: z.string(),
});

export type PriorityId = z.infer<typeof PriorityIdSchema>;
