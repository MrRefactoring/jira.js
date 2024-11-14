import type { WorkflowValidationError } from './workflowValidationError.js';

export interface WorkflowValidationErrorList {
  /** The list of validation errors. */
  errors?: WorkflowValidationError[];
}
