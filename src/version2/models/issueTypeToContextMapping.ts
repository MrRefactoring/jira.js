/** Mapping of an issue type to a context. */
export interface IssueTypeToContextMapping {
  /** The ID of the context. */
  contextId: string;
  /** Whether the context is mapped to any issue type. */
  isAnyIssueType?: boolean;
  /** The ID of the issue type. */
  issueTypeId?: string;
}
