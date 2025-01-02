export interface MergeVersions {
  /** The ID of the version to delete. */
  id: string;
  /** The ID of the version to merge into. */
  moveIssuesTo: string;
}
