import type { WorkflowLayout } from './workflowLayout';

/** The statuses associated with this workflow. */
export interface StatusLayoutUpdate {
  layout?: WorkflowLayout;
  /** The properties for this status layout. */
  properties: unknown;
  /** A unique ID which the status will use to refer to this layout configuration. */
  statusReference: string;
}
