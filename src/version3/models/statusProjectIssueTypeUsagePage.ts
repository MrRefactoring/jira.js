import type { StatusProjectIssueTypeUsage } from './statusProjectIssueTypeUsage';

/** A page of issue types. */
export interface StatusProjectIssueTypeUsagePage {
  /** Page token for the next page of issue type usages. */
  nextPageToken?: string;
  /** The list of issue types. */
  values?: StatusProjectIssueTypeUsage[];
}
