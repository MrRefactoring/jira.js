import { z } from 'zod';

/** Details about a group. */
export const GroupDetailsSchema = z.object({
  /**
   * The ID of the group, which uniquely identifies the group across all Atlassian products. For example,
   * _952d12c3-5b5b-4d04-bb32-44d383afc4b2_.
   */
  groupId: z.string().optional(),
  /** The name of the group. */
  name: z.string().optional(),
});

export type GroupDetails = z.infer<typeof GroupDetailsSchema>;
