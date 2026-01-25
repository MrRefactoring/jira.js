export interface GetFieldAssociationSchemes {
  /** List of project IDs to filter schemes by. If not provided, schemes from all projects are returned. */
  projectId?: number[];
  /**
   * Text filter for scheme name or description matching (case-insensitive). If not provided, no text filtering is
   * applied.
   */
  query?: string;
  /** Zero-based index of the first item to return (default: 0) */
  startAt?: number;
  /** Maximum number of items to return per page (default: 50, max: 100) */
  maxResults?: number;
}
