import { z } from 'zod';
import { apiObject } from '#/core';
import { PagedListUserDetailsApplicationUserSchema } from './pagedListUserDetailsApplicationUser';

export const GroupSchema = apiObject({
  /** Expand options that include additional group details in the response. */
  expand: z.string().optional(),
  /**
   * The ID of the group, which uniquely identifies the group across all Atlassian products. For example,
   * _952d12c3-5b5b-4d04-bb32-44d383afc4b2_.
   */
  groupId: z.string().nullish(),
  /** The name of group. */
  name: z.string().optional(),
  /** The URL for these group details. */
  self: z.string().url().optional(),
  users: PagedListUserDetailsApplicationUserSchema.optional(),
});

export type Group = z.infer<typeof GroupSchema>;
