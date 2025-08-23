import { z } from 'zod';

export const GroupSchema = z.object({
  /** Expand options that include additional group details in the response. */
  expand: z.string().optional(),
  /**
   * The ID of the group, which uniquely identifies the group across all Atlassian products. For example,
   * _952d12c3-5b5b-4d04-bb32-44d383afc4b2_.
   */
  groupId: z.string().optional(),
  /** The name of group. */
  name: z.string().optional(),
  /** The URL for these group details. */
  self: z.string().optional(),
  /**
   * A paginated list of the users that are members of the group. A maximum of 50 users is returned in the list, to
   * access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 50
   * users, use`?expand=users[51:100]`.
   */
  users: z.unknown().optional(),
});

export type Group = z.infer<typeof GroupSchema>;
