/**
 * List of custom fields using the version. */
export interface VersionUsageInCustomField {
  /** The name of the custom field. */
  fieldName?: string;
  /** The ID of the custom field. */
  customFieldId?: number;
  /** Count of the issues where the custom field contains the version. */
  issueCountWithVersionInCustomField?: number;
}
