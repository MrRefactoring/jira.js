import { z } from 'zod';

/** Details about a group. */
export const GroupNameSchema = z.object({
  /**
   * The ID of the group, which uniquely identifies the group across all Atlassian products. For example,
   * _952d12c3-5b5b-4d04-bb32-44d383afc4b2_.
   */
  groupId: z.string().optional(),
  /** The name of group. */
  name: z.string().optional(),
  /** The URL for these group details. */
  self: z.string().optional(),
});

export type GroupName = z.infer<typeof GroupNameSchema>;
