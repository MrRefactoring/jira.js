import { AutoCompleteSuggestion } from './autoCompleteSuggestion';

/**
 * The results from a JQL query. */
export interface AutoCompleteSuggestions {
  /** The list of suggested item. */
  results?: AutoCompleteSuggestion[];
}
