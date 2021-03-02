/**
 * Error messages from an operation. */
export interface ErrorCollection {
  /** The list of error messages produced by this operation. For example, "input parameter 'key' must be provided" */
  errorMessages?: string[];
  /** The list of errors by parameter returned by the operation. For example,"projectKey": "Project keys must start with an uppercase letter, followed by one or more uppercase alphanumeric characters." */
  errors?: {};
  status?: number;
}
