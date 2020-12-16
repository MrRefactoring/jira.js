/**
 * Details about the replacement for a deleted version. */
export interface CustomFieldReplacement {
  /** The ID of the custom field in which to replace the version number. */
  customFieldId?: number;
  /** The version number to use as a replacement for the deleted version. */
  moveTo?: number;
}
