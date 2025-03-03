export interface GetTeams {
  /** The ID of the plan. */
  planId: number;
  /** The cursor to start from. If not provided, the first page will be returned. */
  cursor?: string;
  /** The maximum number of plan teams to return per page. The maximum value is 50. The default value is 50. */
  maxResults?: number;
}
