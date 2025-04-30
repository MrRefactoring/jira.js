/** The field configuration to issue type mapping. */
export interface FieldConfigurationToIssueTypeMapping {
  /**
   * The ID of the issue type or _default_. When set to _default_ this field configuration issue type item applies to
   * all issue types without a field configuration. An issue type can be included only once in a request.
   */
  issueTypeId: string;
  /** The ID of the field configuration. */
  fieldConfigurationId: string;
}
