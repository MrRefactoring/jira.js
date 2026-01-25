export interface ParameterRemovalDetails {
  /** Set of parameter names to remove */
  parameters?: string[];
  /** ID of the field scheme */
  schemeId?: number;
  /** Set of work type (issue type) IDs */
  workTypeIds?: number[];
}
