import { SuggestedIssue } from './suggestedIssue';

/** A type of issue suggested for use in auto-completion. */
export interface IssuePickerSuggestionsIssueType {
  /** The label of the type of issues suggested for use in auto-completion. */
  label?: string;
  /** If issue suggestions are found, returns a message indicating the number of issues suggestions found and returned. */
  sub?: string;
  /** The ID of the type of issues suggested for use in auto-completion. */
  id?: string;
  /** If no issue suggestions are found, returns a message indicating no suggestions were found, */
  msg?: string;
  /** A list of issues suggested for use in auto-completion. */
  issues?: SuggestedIssue[];
}
