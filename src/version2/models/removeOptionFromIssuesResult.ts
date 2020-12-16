import { SimpleErrorCollection } from './simpleErrorCollection';

export interface RemoveOptionFromIssuesResult {
  /** The IDs of the modified issues. */
  modifiedIssues?: number[];
  /** The IDs of the unchanged issues, those issues where errors prevent modification. */
  unmodifiedIssues?: number[];
  /** A collection of errors related to unchanged issues. The collection size is limited, which means not all errors may be returned. */
  errors?: SimpleErrorCollection[];
}
