/** Details of the contextual configuration for a custom field. */
export interface BulkContextualConfiguration {
  /** The field configuration. */
  configuration?: unknown;
  /** The ID of the custom field. */
  customFieldId: string;
  /** The ID of the field context the configuration is associated with. */
  fieldContextId: string;
  /** The ID of the configuration. */
  id: string;
  /** The field value schema. */
  schema?: unknown;
}
