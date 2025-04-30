import type { StatusWorkflowUsageWorkflow } from './statusWorkflowUsageWorkflow';

/** A page of workflows. */
export interface StatusWorkflowUsagePage {
  /** Page token for the next page of issue type usages. */
  nextPageToken?: string;
  /** The list of statuses. */
  values?: StatusWorkflowUsageWorkflow[];
}
