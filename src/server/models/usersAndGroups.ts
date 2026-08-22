import type { z } from 'zod';
import { apiObject } from '#/core';
import { GroupSuggestionsSchema } from './groupSuggestions';
import { UserPickerResultsSchema } from './userPickerResults';

export const UsersAndGroupsSchema = apiObject({
  groups: GroupSuggestionsSchema.optional(),
  users: UserPickerResultsSchema.optional(),
});

export type UsersAndGroups = z.infer<typeof UsersAndGroupsSchema>;
