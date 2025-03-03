export interface GetSecurityLevelMembers {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * The list of issue security level member IDs. To include multiple issue security level members separate IDs with an
   * ampersand: `id=10000&id=10001`.
   */
  id?: string | string[];
  /**
   * The list of issue security scheme IDs. To include multiple issue security schemes separate IDs with an ampersand:
   * `schemeId=10000&schemeId=10001`.
   */
  schemeId?: string | string[];
  /**
   * The list of issue security level IDs. To include multiple issue security levels separate IDs with an ampersand:
   * `levelId=10000&levelId=10001`.
   */
  levelId?: string | string[];
  /**
   * Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand
   * options include:
   *
   * - `all` Returns all expandable information
   * - `field` Returns information about the custom field granted the permission
   * - `group` Returns information about the group that is granted the permission
   * - `projectRole` Returns information about the project role granted the permission
   * - `user` Returns information about the user who is granted the permission
   */
  expand?:
    | 'all'
    | 'field'
    | 'group'
    | 'projectRole'
    | 'user'
    | ('all' | 'field' | 'group' | 'projectRole' | 'user')[]
    | string
    | string[];
}
