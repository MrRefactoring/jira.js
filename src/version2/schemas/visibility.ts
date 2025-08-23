import { z } from 'zod';

/** The group or role to which this item is visible. */
export const VisibilitySchema = z.object({
  /** The ID of the group or the name of the role that visibility of this item is restricted to. */
  identifier: z.string().optional(),
  /** Whether visibility of this item is restricted to a group or role. */
  type: z.enum(['group', 'role']).optional(),
  /**
   * The name of the group or role that visibility of this item is restricted to. Please note that the name of a group
   * is mutable, to reliably identify a group use `identifier`.
   */
  value: z.string().optional(),
});

export type Visibility = z.infer<typeof VisibilitySchema>;
