import type { z } from 'zod';
import { apiObject } from '#/core';
import { FoundGroupsSchema } from './foundGroups';
import { FoundUsersSchema } from './foundUsers';
/** List of users and groups found in a search. */

export const FoundUsersAndGroupsSchema = apiObject({
  groups: FoundGroupsSchema.optional(),
  users: FoundUsersSchema.optional(),
});

export type FoundUsersAndGroups = z.infer<typeof FoundUsersAndGroupsSchema>;
