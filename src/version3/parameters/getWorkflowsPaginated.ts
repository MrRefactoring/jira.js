export interface GetWorkflowsPaginated {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * The name of a workflow to return. To include multiple workflows, provide an ampersand-separated list. For example,
   * `workflowName=name1&workflowName=name2`.
   */
  workflowName?: string[];
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * - `transitions` For each workflow, returns information about the transitions inside the workflow.
   * - `transitions.rules` For each workflow transition, returns information about its rules. Transitions are included
   *   automatically if this expand is requested.
   * - `transitions.properties` For each workflow transition, returns information about its properties. Transitions are
   *   included automatically if this expand is requested.
   * - `statuses` For each workflow, returns information about the statuses inside the workflow.
   * - `statuses.properties` For each workflow status, returns information about its properties. Statuses are included
   *   automatically if this expand is requested.
   * - `default` For each workflow, returns information about whether this is the default workflow.
   * - `schemes` For each workflow, returns information about the workflow schemes the workflow is assigned to.
   */
  expand?:
  | 'transitions'
  | 'transitions.rules'
  | 'transitions.properties'
  | 'statuses'
  | 'statuses.properties'
  | 'default'
  | 'schemes'
  | (
    | 'transitions'
    | 'transitions.rules'
    | 'transitions.properties'
    | 'statuses'
    | 'statuses.properties'
    | 'default'
    | 'schemes'
  )[]
  | string
  | string[];
  /** String used to perform a case-insensitive partial match with workflow name. */
  queryString?: string;
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#ordering) the results by a field:
   *
   * - `name` Sorts by workflow name.
   * - `created` Sorts by create time.
   * - `updated` Sorts by update time.
   */
  orderBy?:
  | 'name'
  | 'created'
  | 'updated'
  | '+name'
  | '+created'
  | '+updated'
  | '-name'
  | '-created'
  | '-updated'
  | string;
  /** Filters active and inactive workflows. */
  isActive?: boolean;
}
