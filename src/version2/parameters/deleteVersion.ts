export interface DeleteVersion {
  /** The ID of the version. */
  id: string;
  /**
   * The ID of the version to update `fixVersion` to when the field contains the deleted version. The replacement
   * version must be in the same project as the version being deleted and cannot be the version being deleted.
   */
  moveFixIssuesTo?: string;
  /**
   * The ID of the version to update `affectedVersion` to when the field contains the deleted version. The replacement
   * version must be in the same project as the version being deleted and cannot be the version being deleted.
   */
  moveAffectedIssuesTo?: string;
}
