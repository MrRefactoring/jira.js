/**
 * The field configuration for an issue type. */
export interface FieldConfigurationIssueTypeItem {
  /** The ID of the field configuration scheme. */
  fieldConfigurationSchemeId: string;
  /** The ID of the issue type or *default*. When set to *default* this field configuration issue type item applies to all issue types without a field configuration. */
  issueTypeId: string;
  /** The ID of the field configuration. */
  fieldConfigurationId: string;
}
