import { IssuePickerSuggestionsIssueType } from './issuePickerSuggestionsIssueType';

/**
 * A list of issues suggested for use in auto-completion. */
export interface IssuePickerSuggestions {
  /** A list of issues for an issue type suggested for use in auto-completion. */
  sections?: IssuePickerSuggestionsIssueType[];
}
