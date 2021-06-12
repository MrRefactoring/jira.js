export interface SimpleErrorCollection {
  /**
   * The list of errors by parameter returned by the operation. For example,"projectKey": "Project keys must start with
   * an uppercase letter, followed by one or more uppercase alphanumeric characters."
   */
  errors?: {};
  /** The list of error messages produced by this operation. For example, "input parameter 'key' must be provided" */
  errorMessages?: string[];
  httpStatusCode?: number;
}
