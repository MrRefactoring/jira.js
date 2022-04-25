/** The details of an issue adjustment's context, which define where to activate the issue adjustment. */
export interface IssueAdjustmentContextDetails {
  /** The ID of the issue adjustment context. */
  id?: string;
  /** The project ID of the context. */
  projectId: string;
  /** The issue type ID of the context. */
  issueTypeId: string;
  /** The view type of the context. Only `GIC` (Global Issue Create) is supported. */
  viewType: string;
  /** Whether a context is available. For example, when a project is deleted the context becomes unavailable. */
  isAvailable?: boolean;
}
