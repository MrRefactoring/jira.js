/** Details of the contextual configuration for a custom field. */
export interface ContextualConfiguration {
  /** The ID of the configuration. */
  id: string;
  /** The ID of the field context the configuration is associated with. */
  fieldContextId: string;
  /** The field configuration. */
  configuration?: unknown;
  /** The field value schema. */
  schema?: unknown;
}
