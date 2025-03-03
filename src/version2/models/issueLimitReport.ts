export interface IssueLimitReport {
  /** A list of ids of issues approaching the limit and their field count */
  issuesApproachingLimit?: {};
  /** A list of ids of issues breaching the limit and their field count */
  issuesBreachingLimit?: {};
  /** The fields and their defined limits */
  limits?: {};
}
