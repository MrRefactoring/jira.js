export interface GetTransitions {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /**
   * Use [expand](#expansion) to include additional information about transitions in the response. This parameter
   * accepts `transitions.fields`, which returns information about the fields in the transition screen for each
   * transition. Fields hidden from the screen are not returned. Use this information to populate the `fields` and
   * `update` fields in [Transition issue](#api-rest-api-3-issue-issueIdOrKey-transitions-post).
   */
  expand?: string;
  /** The ID of the transition. */
  transitionId?: string;
  /** Whether transitions with the condition *Hide From User Condition* are included in the response. */
  skipRemoteOnlyCondition?: boolean;
  /** Whether details of transitions that fail a condition are included in the response */
  includeUnavailableTransitions?: boolean;
  /**
   * Whether the transitions are sorted by ops-bar sequence value first then category order (Todo, In Progress, Done) or
   * only by ops-bar sequence value.
   */
  sortByOpsBarAndStatus?: boolean;
}
