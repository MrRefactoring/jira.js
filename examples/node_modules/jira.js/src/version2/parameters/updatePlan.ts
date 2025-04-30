export interface UpdatePlan {
  /** The ID of the plan. */
  planId: number;
  /** Whether to accept group IDs instead of group names. Group names are deprecated. */
  useGroupId?: boolean;
}
