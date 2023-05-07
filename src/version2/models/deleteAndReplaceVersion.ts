import { CustomFieldReplacement } from './customFieldReplacement';

/** @deprecated Use {@link DeleteAndReplaceVersion} instead. */
export type DeleteAndReplaceVersionBean = DeleteAndReplaceVersion;

export interface DeleteAndReplaceVersion {
  /**
   * An array of custom field IDs (`customFieldId`) and version IDs (`moveTo`) to update when the fields contain the
   * deleted version.
   */
  customFieldReplacementList?: CustomFieldReplacement[];
  /** The ID of the version to update `affectedVersion` to when the field contains the deleted version. */
  moveAffectedIssuesTo?: number;
  /** The ID of the version to update `fixVersion` to when the field contains the deleted version. */
  moveFixIssuesTo?: number;
}
