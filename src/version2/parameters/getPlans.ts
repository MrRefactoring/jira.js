export interface GetPlans {
  /** Whether to include trashed plans in the results. */
  includeTrashed?: boolean;
  /** Whether to include archived plans in the results. */
  includeArchived?: boolean;
  /** The cursor to start from. If not provided, the first page will be returned. */
  cursor?: string;
  /** The maximum number of plans to return per page. The maximum value is 50. The default value is 50. */
  maxResults?: number;
}
