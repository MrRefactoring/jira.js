/** List of custom fields using the version. */
export interface VersionUsageInCustomField {
  /** The ID of the custom field. */
  customFieldId?: number;
  /** The name of the custom field. */
  fieldName?: string;
  /** Count of the issues where the custom field contains the version. */
  issueCountWithVersionInCustomField?: number;
}
