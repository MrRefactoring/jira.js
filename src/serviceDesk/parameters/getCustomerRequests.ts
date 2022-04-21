export interface GetCustomerRequests {
  /**
   * Filters customer requests where the request summary matches the `searchTerm`.
   * [Wildcards](https://confluence.atlassian.com/display/JIRACORECLOUD/Search+syntax+for+text+fields) can be used in
   * the `searchTerm` parameter.
   */
  searchTerm?: string;
  /**
   * Filters customer requests using the following values:
   *
   * `OWNED_REQUESTS` returns customer requests where the user is the creator. `PARTICIPATED_REQUESTS` returns customer
   * requests where the user is a participant. `ORGANIZATION` returns customer requests for an organization of which the
   * user is a member when used in conjunction with `organizationId`. `ALL_ORGANIZATIONS` returns customer requests that
   * belong to all organizations of which the user is a member. `APPROVER` returns customer requests where the user is
   * an approver. Can be used in conjunction with `approvalStatus` to filter pending or complete approvals.
   * `ALL_REQUESTS` returns all customer requests. **Deprecated and will be removed, as the returned requests may change
   * if more values are added in the future. Instead, explicitly list the desired filtering strategies.**
   *
   *     Multiple values of the query parameter are supported. For example, `requestOwnership=OWNED_REQUESTS&requestOwnership=PARTICIPATED_REQUESTS` will only return customer requests where the user is the creator or a participant. If not specified, filtering defaults to `OWNED_REQUESTS`, `PARTICIPATED_REQUESTS`, and `ALL_ORGANIZATIONS`.
   */
  requestOwnership?: string[];
  /**
   * Filters customer requests where the request is closed, open, or either of the two where:
   *
   * `CLOSED_REQUESTS` returns customer requests that are closed. `OPEN_REQUESTS` returns customer requests that are
   * open. `ALL_REQUESTS` returns all customer requests.
   */
  requestStatus?: string;
  /**
   * Filters results to customer requests based on their approval status:
   *
   * `MY_PENDING_APPROVAL` returns customer requests pending the user's approval. `MY_HISTORY_APPROVAL` returns customer
   * requests where the user was an approver.
   *
   * **Note**: Valid only when used with requestOwnership=APPROVER.
   */
  approvalStatus?: string;
  /**
   * Filters customer requests that belong to a specific organization (note that the user must be a member of that
   * organization). **Note**: Valid only when used with requestOwnership=ORGANIZATION.
   */
  organizationId?: number;
  /** Filters customer requests by service desk. */
  serviceDeskId?: number;
  /**
   * Filters customer requests by request type. Note that the `serviceDeskId` must be specified for the service desk in
   * which the request type belongs.
   */
  requestTypeId?: number;
  /**
   * A multi-value parameter indicating which properties of the customer request to expand, where:
   *
   * `serviceDesk` returns additional details for each service desk. `requestType` returns additional details for each
   * request type. `participant` returns the participant details, if any, for each customer request. `sla` returns the
   * SLA information on each customer request. `status` returns the status transitions, in chronological order, for each
   * customer request. `attachment` returns the attachments for the customer request. `action` returns the actions that
   * the user can or cannot perform on this customer request. `comment` returns the comments, if any, for each customer
   * request. `comment.attachment` returns the attachment details, if any, for each comment. `comment.renderedBody`
   * (Experimental) returns the rendered body in HTML format (in addition to the raw body) for each comment.
   */
  expand?: string[];
  /**
   * The starting index of the returned objects. Base index: 0. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#pagination) section for more details.
   */
  start?: number;
  /**
   * The maximum number of items to return per page. Default: 50. See the
   * [Pagination](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#pagination) section for more details.
   */
  limit?: number;
}
