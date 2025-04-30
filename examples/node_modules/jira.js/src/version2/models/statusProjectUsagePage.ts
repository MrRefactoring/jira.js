import type { StatusProjectUsage } from './statusProjectUsage';

/** A page of projects. */
export interface StatusProjectUsagePage {
  /** Page token for the next page of issue type usages. */
  nextPageToken?: string;
  /** The list of projects. */
  values?: StatusProjectUsage[];
}
