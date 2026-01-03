import { z } from 'zod';

/** Parameters for getting statuses by name. */
export const GetStatusesByNameSchema = z.object({
  /**
   * The list of status names.
   *
   * Min items `1`, Max items `50`
   */
  name: z.array(z.string()).min(1, 'At least one status name is required').max(50, 'Maximum 50 status names allowed'),

  /** The project the status is part of or null for global statuses. */
  projectId: z.string().optional(),
});

export type GetStatusesByName = z.infer<typeof GetStatusesByNameSchema>;
