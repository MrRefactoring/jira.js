import { z } from 'zod';
import { AutoCompleteSuggestionSchema } from './autoCompleteSuggestion';

/** The results from a JQL query. */
export const AutoCompleteSuggestionsSchema = z.object({
  /** The list of suggested item. */
  results: z.array(AutoCompleteSuggestionSchema).optional(),
});

export type AutoCompleteSuggestions = z.infer<typeof AutoCompleteSuggestionsSchema>;
