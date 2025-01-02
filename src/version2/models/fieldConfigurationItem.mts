/** A field within a field configuration. */
export interface FieldConfigurationItem {
  /** The description of the field within the field configuration. */
  description?: string;
  /** The ID of the field within the field configuration. */
  id: string;
  /** Whether the field is hidden in the field configuration. */
  isHidden?: boolean;
  /** Whether the field is required in the field configuration. */
  isRequired?: boolean;
  /** The renderer type for the field within the field configuration. */
  renderer?: string;
}
