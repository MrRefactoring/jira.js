import type { SimpleErrorCollection } from './simpleErrorCollection';

export interface RemoveOptionFromIssuesResult {
  errors?: SimpleErrorCollection;
  /** The IDs of the modified issues. */
  modifiedIssues?: number[];
  /** The IDs of the unchanged issues, those issues where errors prevent modification. */
  unmodifiedIssues?: number[];
}
