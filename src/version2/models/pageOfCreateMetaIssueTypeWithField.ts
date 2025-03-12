import type { FieldCreateMetadata } from './fieldCreateMetadata';

/** A page of CreateMetaIssueType with Field. */
export interface PageOfCreateMetaIssueTypeWithField {
  /** The collection of FieldCreateMetaBeans. */
  fields?: FieldCreateMetadata[];
  /** The maximum number of items to return per page. */
  maxResults?: number;
  results?: FieldCreateMetadata[];
  /** The index of the first item returned. */
  startAt?: number;
  /** The total number of items in all pages. */
  total?: number;
}
