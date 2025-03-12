import type { IssueBulkEditField } from './issueBulkEditField';

/** Bulk Edit Get Fields Response. */
export interface BulkEditGetFields {
  /** The end cursor for use in pagination. */
  endingBefore?: string;
  /** List of all the fields */
  fields?: IssueBulkEditField[];
  /** The start cursor for use in pagination. */
  startingAfter?: string;
}
