/** The IDs of the screen schemes for the issue type IDs. */
export interface IssueTypeScreenSchemeMapping {
  /**
   * The ID of the issue type or _default_. Only issue types used in classic projects are accepted. An entry for
   * _default_ must be provided and defines the mapping for all issue types without a screen scheme.
   */
  issueTypeId: string;
  /** The ID of the screen scheme. Only screen schemes used in classic projects are accepted. */
  screenSchemeId: string;
}
