import type { ProjectUsage } from './projectUsage';

/** A page of projects. */
export interface ProjectUsagePage {
  /** Page token for the next page of project usages. */
  nextPageToken?: string;
  /** The list of projects. */
  values?: ProjectUsage[];
}
