export interface GetWorkflowTransitionRuleConfigurations {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The types of the transition rules to return. */
  types: string[];
  /** The transition rule class keys, as defined in the Connect app descriptor, of the transition rules to return. */
  keys?: string[];
  /** EXPERIMENTAL: The list of workflow names to filter by. */
  workflowNames?: string[];
  /** EXPERIMENTAL: The list of `tags` to filter by. */
  withTags?: string[];
  /** EXPERIMENTAL: Whether draft or published workflows are returned. If not provided, both workflow types are returned. */
  draft?: boolean;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information in the response. This parameter accepts `transition`, which, for each rule, returns information about
   * the transition the rule is assigned to.
   */
  expand?: string;
}
