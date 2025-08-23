import { z } from 'zod';

export const ActorsMapSchema = z.object({
  /**
   * The name of the group to add. This parameter cannot be used with the `groupId` parameter. As a group's name can
   * change, use of `groupId` is recommended.
   */
  group: z.array(z.string()).optional(),
  /** The ID of the group to add. This parameter cannot be used with the `group` parameter. */
  groupId: z.array(z.string()).optional(),
  /** The user account ID of the user to add. */
  user: z.array(z.string()).optional(),
});

export type ActorsMap = z.infer<typeof ActorsMapSchema>;
