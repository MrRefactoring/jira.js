/** The screen scheme for an issue type. */
export interface IssueTypeScreenSchemeItem {
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: string;
  /**
   * The ID of the issue type or _default_. Only issue types used in classic projects are accepted. When creating an
   * issue screen scheme, an entry for _default_ must be provided and defines the mapping for all issue types without a
   * screen scheme. Otherwise, a _default_ entry can't be provided.
   */
  issueTypeId: string;
  /** The ID of the screen scheme. */
  screenSchemeId: string;
}
