/**
 * A field auto-complete suggestion. */
export interface AutoCompleteSuggestion {
  /** The value of a suggested item. */
  value?: string;
  /** The display name of a suggested item. If `fieldValue` or `predicateValue` are provided, the matching text is highlighted with the HTML bold tag. */
  displayName?: string;
}
