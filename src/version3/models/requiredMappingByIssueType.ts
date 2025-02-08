/** The list of required status mappings by issue type. */
export interface RequiredMappingByIssueType {
  /** The ID of the issue type. */
  issueTypeId?: string;
  /** The status IDs requiring mapping. */
  statusIds?: string[];
}
