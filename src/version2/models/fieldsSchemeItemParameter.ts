/**
 * The default parameters to apply to the field across all work types in the specified schemes, may be null if only work
 * type-specific updates are needed
 */
export interface FieldsSchemeItemParameter {
  /** The custom description for the field, null to preserve current description */
  description?: string;
  /** Whether the field is required, null to preserve current requirement setting */
  isRequired?: boolean;
}
