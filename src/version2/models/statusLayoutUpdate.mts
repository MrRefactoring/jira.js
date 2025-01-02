import { WorkflowLayout } from './workflowLayout.mjs';

/** The statuses associated with this workflow. */
export interface StatusLayoutUpdate {
  layout?: WorkflowLayout;
  /** The properties for this status layout. */
  properties: {};
  /** A unique ID which the status will use to refer to this layout configuration. */
  statusReference: string;
}
