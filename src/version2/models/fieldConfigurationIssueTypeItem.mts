/** The field configuration for an issue type. */
export interface FieldConfigurationIssueTypeItem {
  /** The ID of the field configuration. */
  fieldConfigurationId: string;
  /** The ID of the field configuration scheme. */
  fieldConfigurationSchemeId: string;
  /**
   * The ID of the issue type or _default_. When set to _default_ this field configuration issue type item applies to
   * all issue types without a field configuration.
   */
  issueTypeId: string;
}
