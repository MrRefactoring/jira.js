export interface JiraExpressionsComplexityValueBean {
  /** The complexity value of the current expression. */
  value: number;
  /** The maximum allowed complexity. The evaluation will fail if this value is exceeded. */
  limit: number;
}
