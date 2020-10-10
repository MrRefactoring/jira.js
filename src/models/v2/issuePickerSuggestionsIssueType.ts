import { SuggestedIssue } from './suggestedIssue';

export interface IssuePickerSuggestionsIssueType {
  label: string;
  sub: string;
  id: string;
  msg: string;
  issues: SuggestedIssue[];
}
