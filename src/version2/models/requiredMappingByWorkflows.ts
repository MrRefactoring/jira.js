/** The list of required status mappings by workflow. */
export interface RequiredMappingByWorkflows {
  /** The ID of the source workflow. */
  sourceWorkflowId?: string;
  /** The status IDs requiring mapping. */
  statusIds?: string[];
  /** The ID of the target workflow. */
  targetWorkflowId?: string;
}
