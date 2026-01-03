/** The list of work type-specific parameter overrides, may be empty if only default parameters are being updated */
export interface FieldsSchemeItemWorkTypeParameter {
  /** The custom description for the field for this work type, null to use default or preserve current */
  description?: string;
  /** Whether the field is required for this work type, null to use default or preserve current */
  isRequired?: boolean;
  /** The ID of the work type (issue type) for which these parameters apply */
  workTypeId?: number;
}
