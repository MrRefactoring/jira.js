import { z } from 'zod';
import { FoundGroupsSchema } from './foundGroups';
import { FoundUsersSchema } from './foundUsers';

/** List of users and groups found in a search. */
export const FoundUsersAndGroupsSchema = z.object({
  groups: FoundGroupsSchema.optional(),
  users: FoundUsersSchema.optional(),
});

export type FoundUsersAndGroups = z.infer<typeof FoundUsersAndGroupsSchema>;
