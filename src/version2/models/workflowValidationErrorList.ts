import type { WorkflowValidationError } from './workflowValidationError';

export interface WorkflowValidationErrorList {
  /** The list of validation errors. */
  errors?: WorkflowValidationError[];
}
