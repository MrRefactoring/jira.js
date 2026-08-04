import { z } from 'zod';

export const GetStatusesByNameSchema = z.object({
  /**
   * The list of status names. To include multiple names, provide an ampersand-separated list. For example,
   * name=nameXX&name=nameYY.
   *
   * Min items `1`, Max items `50`
   */
  name: z.array(z.string()),
  /** The project the status is part of or null for global statuses. */
  projectId: z.string().optional(),
});

export type GetStatusesByName = z.input<typeof GetStatusesByNameSchema>;
