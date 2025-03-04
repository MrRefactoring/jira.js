export interface GetIssueSourceResponse {
  /** The issue source type. This is "Board", "Project" or "Filter". */
  type: 'Board' | 'Project' | 'Filter' | 'Custom' | string;
  /**
   * The issue source value. This is a board ID if the type is "Board", a project ID if the type is "Project" or a
   * filter ID if the type is "Filter".
   */
  value: number;
}
