import type { DateRangeFilter } from '../models';

/** Details of a filter for exporting archived issues. */
export interface ExportArchivedIssues {
  /** List archived issues archived by a specified account ID. */
  archivedBy?: string[];
  archivedDateRange?: DateRangeFilter;
  /** List archived issues with a specified issue type ID. */
  issueTypes?: string[];
  /** List archived issues with a specified project key. */
  projects?: string[];
  /** List archived issues where the reporter is a specified account ID. */
  reporters?: string[];
}
