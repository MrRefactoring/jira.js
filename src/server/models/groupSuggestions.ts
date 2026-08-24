import { z } from 'zod';
import { apiObject } from '#/core';
import { GroupSuggestionSchema } from './groupSuggestion';

export const GroupSuggestionsSchema = apiObject({
  groups: z.array(GroupSuggestionSchema).optional(),
  header: z.string().optional(),
  total: z.number().optional(),
});

export type GroupSuggestions = z.infer<typeof GroupSuggestionsSchema>;
