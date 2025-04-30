export interface GetSecurityLevels {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * The list of issue security scheme level IDs. To include multiple issue security levels, separate IDs with an
   * ampersand: `id=10000&id=10001`.
   */
  id?: string[];
  /**
   * The list of issue security scheme IDs. To include multiple issue security schemes, separate IDs with an ampersand:
   * `schemeId=10000&schemeId=10001`.
   */
  schemeId?: string[];
  /**
   * When set to true, returns multiple default levels for each security scheme containing a default. If you provide
   * scheme and level IDs not associated with the default, returns an empty page. The default value is false.
   */
  onlyDefault?: boolean;
}
