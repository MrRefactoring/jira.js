export interface GetPlan {
  /** The ID of the plan. */
  planId: number;
  /** Whether to return group IDs instead of group names. Group names are deprecated. */
  useGroupId?: boolean;
}
