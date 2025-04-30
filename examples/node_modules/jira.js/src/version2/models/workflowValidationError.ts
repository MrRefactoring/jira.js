import type { WorkflowElementReference } from './workflowElementReference';

/** The details about a workflow validation error. */
export interface WorkflowValidationError {
  /** An error code. */
  code?: string;
  elementReference?: WorkflowElementReference;
  /** The validation error level. */
  level?: string;
  /** An error message. */
  message?: string;
  /** The type of element the error or warning references. */
  type?: string;
}
