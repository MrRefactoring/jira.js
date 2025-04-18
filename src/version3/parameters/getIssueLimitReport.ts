export interface GetIssueLimitReport {
  /** Return issue keys instead of issue ids in the response. */
  isReturningKeys?: boolean;
  /**
   * A list of fields and their respective approaching limit threshold. Required for querying issues approaching limits.
   * Optional for querying issues breaching limits. Accepted fields are:
   *
   * - `comment`
   * - `worklog`
   * - `attachment`
   * - `remoteIssueLinks`,
   * - `issuelinks`.
   *
   * @example
   *   {
   *     "issuesApproachingLimitParams": {
   *       "comment": 4500,
   *       "attachment": 1800
   *     }
   *   }
   */
  issuesApproachingLimitParams?: {
    /** The limit for the number of comments. */
    comment?: number;
    /** The limit for the number of worklogs. */
    worklog?: number;
    /** The limit for the number of attachments. */
    attachment?: number;
    /** The limit for the number of remote issue links. */
    remoteIssueLinks?: number;
    /** The limit for the number of issue links. */
    issuelinks?: number;
  };
}
