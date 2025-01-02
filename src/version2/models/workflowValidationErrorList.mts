import { WorkflowValidationError } from './workflowValidationError.mjs';

export interface WorkflowValidationErrorList {
  /** The list of validation errors. */
  errors?: WorkflowValidationError[];
}
