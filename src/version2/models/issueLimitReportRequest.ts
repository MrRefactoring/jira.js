export interface IssueLimitReportRequest {
  /**
   * A list of fields and their respective approaching limit threshold. Required for querying issues approaching limits.
   * Optional for querying issues breaching limits. Accepted fields are: `comment`, `worklog`, `attachment`,
   * `remoteIssueLinks`, and `issuelinks`. Example: `{"issuesApproachingLimitParams": {"comment": 4500, "attachment":
   * 1800}}`
   */
  issuesApproachingLimitParams?: unknown;
}
