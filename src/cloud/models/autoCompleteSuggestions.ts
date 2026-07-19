import { z } from 'zod';
import { apiObject } from '#/core';
import { AutoCompleteSuggestionSchema } from './autoCompleteSuggestion';
/** The results from a JQL query. */

export const AutoCompleteSuggestionsSchema = apiObject({
  /** The list of suggested item. */
  results: z.array(AutoCompleteSuggestionSchema).optional(),
});

export type AutoCompleteSuggestions = z.infer<typeof AutoCompleteSuggestionsSchema>;
