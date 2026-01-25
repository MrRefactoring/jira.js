import type { FieldsSchemeItemParameter, FieldsSchemeItemWorkTypeParameter } from '../models';

/** Request for updating field scheme parameters across multiple schemes and work types. */
export interface UpdateFieldSchemeParametersRequest {
  parameters?: FieldsSchemeItemParameter;
  /** The list of field scheme IDs to update */
  schemeIds?: number[];
  /** The list of work type-specific parameter overrides, may be empty if only default parameters are being updated */
  workTypeParameters?: FieldsSchemeItemWorkTypeParameter[];
}
