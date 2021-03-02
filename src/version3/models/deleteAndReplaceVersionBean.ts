import { CustomFieldReplacement } from './customFieldReplacement';

export interface DeleteAndReplaceVersionBean {
  /** The ID of the version to update `fixVersion` to when the field contains the deleted version. */
  moveFixIssuesTo?: number;
  /** The ID of the version to update `affectedVersion` to when the field contains the deleted version. */
  moveAffectedIssuesTo?: number;
  /** An array of custom field IDs (`customFieldId`) and version IDs (`moveTo`) to update when the fields contain the deleted version. */
  customFieldReplacementList?: CustomFieldReplacement[];
}
