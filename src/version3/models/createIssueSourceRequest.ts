export interface CreateIssueSourceRequest {
  /** The issue source type. This must be "Board", "Project" or "Filter". */
  type: 'Board' | 'Project' | 'Filter' | string;
  /**
   * The issue source value. This must be a board ID if the type is "Board", a project ID if the type is "Project" or a
   * filter ID if the type is "Filter".
   */
  value: number;
}
