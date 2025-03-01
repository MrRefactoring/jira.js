/** Details of changes to a priority scheme's priorities that require suggested priority mappings. */
export interface SuggestedMappingsForPrioritiesRequestBean {
  /** The ids of priorities being removed from the scheme. */
  add?: number[];
  /** The ids of priorities being removed from the scheme. */
  remove?: number[];
}
