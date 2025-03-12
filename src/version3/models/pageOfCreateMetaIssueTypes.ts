import type { IssueTypeIssueCreateMetadata } from './issueTypeIssueCreateMetadata';

/** A page of CreateMetaIssueTypes. */
export interface PageOfCreateMetaIssueTypes {
  createMetaIssueType?: IssueTypeIssueCreateMetadata[];
  /** The list of CreateMetaIssueType. */
  issueTypes?: IssueTypeIssueCreateMetadata[];
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The index of the first item returned. */
  startAt?: number;
  /** The total number of items in all pages. */
  total?: number;
}
