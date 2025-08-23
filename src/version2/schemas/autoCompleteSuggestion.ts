import { z } from 'zod';

/** A field auto-complete suggestion. */
export const AutoCompleteSuggestionSchema = z.object({
  /**
   * The display name of a suggested item. If `fieldValue` or `predicateValue` are provided, the matching text is
   * highlighted with the HTML bold tag.
   */
  displayName: z.string().optional(),
  /** The value of a suggested item. */
  value: z.string().optional(),
});

export type AutoCompleteSuggestion = z.infer<typeof AutoCompleteSuggestionSchema>;
