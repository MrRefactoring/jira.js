import { z } from 'zod';

export const MovePrioritiesParametersSchema = z.object({
  /** The ID of the priority. Required if `position` isn't provided. */
  after: z.string().optional(),
  /** The list of issue IDs to be reordered. Cannot contain duplicates nor after ID. */
  ids: z.array(z.string()),
  /** The position for issue priorities to be moved to. Required if `after` isn't provided. */
  position: z.string().optional(),
});

export type MovePrioritiesParameters = z.infer<typeof MovePrioritiesParametersSchema>;
