import type { Changelog } from './changelog';

/** List of changelogs that belong to single issue */
export interface IssueChangeLog {
  /** List of changelogs that belongs to given issueId. */
  changeHistories?: Changelog[];
  /** The ID of the issue. */
  issueId?: string;
}
