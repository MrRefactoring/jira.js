import type { WorkflowSchemeUsage } from './workflowSchemeUsage';

/** A page of workflow schemes. */
export interface WorkflowSchemeUsagePage {
  /** Token for the next page of issue type usages. */
  nextPageToken?: string;
  /** The list of workflow schemes. */
  values?: WorkflowSchemeUsage[];
}
