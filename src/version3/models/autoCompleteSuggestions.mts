import { AutoCompleteSuggestion } from './autoCompleteSuggestion.mjs';

/** The results from a Jql query. */
export interface AutoCompleteSuggestions {
  /** The list of suggested item. */
  results?: AutoCompleteSuggestion[];
}
