import { z } from 'zod';

export const MoveResolutionsParametersSchema = z.object({
  /** The ID of the resolution. Required if `position` isn't provided. */
  after: z.string().optional(),
  /** The list of resolution IDs to be reordered. Cannot contain duplicates nor after ID. */
  ids: z.array(z.string()),
  /** The position for issue resolutions to be moved to. Required if `after` isn't provided. */
  position: z.string().optional(),
});

export type MoveResolutionsParameters = z.infer<typeof MoveResolutionsParametersSchema>;
