import { z } from 'zod';

/** Status mapping for statuses in source workflow to respective target status in target workflow. */
export const targetStatusSchema = z.object({
  /**
   * An object with the key as the ID of the target status and value with the list of the IDs of the current source
   * statuses.
   */
  statuses: z.record(z.string(), z.any()),
});

export type targetStatus = z.infer<typeof targetStatusSchema>;
