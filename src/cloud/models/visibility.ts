import { z } from 'zod';
import { apiObject } from '#/core';
/** The group or role to which this item is visible. */

export const VisibilitySchema = apiObject({
  /** The ID of the group or the name of the role that visibility of this item is restricted to. */
  identifier: z.string().nullish(),
  /** Whether visibility of this item is restricted to a group or role. */
  type: z.enum(['group', 'role']).optional(),
  /**
   * The name of the group or role that visibility of this item is restricted to. Please note that the name of a group
   * is mutable, to reliably identify a group use `identifier`.
   */
  value: z.string().optional(),
});

export type Visibility = z.infer<typeof VisibilitySchema>;
