import { z } from 'zod';

export const DeleteStatusesByIdSchema = z.object({
  /**
   * The list of status IDs. To include multiple IDs, provide an ampersand-separated list. For example,
   * id=10000&id=10001.
   *
   * Min items `1`, Max items `50`
   */
  id: z.array(z.string()),
});

export type DeleteStatusesById = z.input<typeof DeleteStatusesByIdSchema>;
