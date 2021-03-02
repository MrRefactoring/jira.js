/**
 * An issue suggested for use in the issue picker auto-completion. */
export interface SuggestedIssue {
  /** The ID of the issue. */
  id?: number;
  /** The key of the issue. */
  key?: string;
  /** The key of the issue in HTML format. */
  keyHtml?: string;
  /** The URL of the issue type's avatar. */
  img?: string;
  /** The phrase containing the query string in HTML format, with the string highlighted with HTML bold tags. */
  summary?: string;
  /** The phrase containing the query string, as plain text. */
  summaryText?: string;
}
