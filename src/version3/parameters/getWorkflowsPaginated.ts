export interface GetWorkflowsPaginated {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The name of a workflow to return. */
  workflowName?: string[];
  /**
   * Use [expand](#expansion) to include additional information in the response. This parameter accepts a
   * comma-separated list. Expand options include:
   *
   * `transitions` For each workflow, returns information about the transitions inside the workflow. `transitions.rules`
   * For each workflow transition, returns information about its rules. Transitions are included automatically if this
   * expand is requested. `statuses` For each workflow, returns information about the statuses inside the workflow.
   * `statuses.properties` For each workflow status, returns information about its properties. Statuses are included
   * automatically if this expand is requested. `default` For each workflow, returns information about whether this is
   * the default workflow.
   */
  expand?: string;
}
