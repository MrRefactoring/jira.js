import type { SuggestedIssue } from './suggestedIssue';

/** A type of issue suggested for use in auto-completion. */
export interface IssuePickerSuggestionsIssueType {
  /** The ID of the type of issues suggested for use in auto-completion. */
  id?: string;
  /** A list of issues suggested for use in auto-completion. */
  issues?: SuggestedIssue[];
  /** The label of the type of issues suggested for use in auto-completion. */
  label?: string;
  /** If no issue suggestions are found, returns a message indicating no suggestions were found, */
  msg?: string;
  /** If issue suggestions are found, returns a message indicating the number of issues suggestions found and returned. */
  sub?: string;
}
