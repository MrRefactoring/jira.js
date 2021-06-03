export interface GetWorkflowTransitionRuleConfigurations {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The types of the transition rules to return. */
  types: string[];
  /** The transition rule class keys, as defined in the Connect app descriptor, of the transition rules to return. */
  keys?: string[];
  /**
   * Use [expand](#expansion) to include additional information in the response. This parameter accepts `transition`,
   * which, for each rule, returns information about the transition the rule is assigned to.
   */
  expand?: string;
}
