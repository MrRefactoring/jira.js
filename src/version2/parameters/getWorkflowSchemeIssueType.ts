export interface GetWorkflowSchemeIssueType {
  /** The ID of the workflow scheme. */
  id: number;
  /** The ID of the issue type. */
  issueType: string;
  /** Returns the mapping from the workflow scheme's draft rather than the workflow scheme, if set to true. If no draft exists, the mapping from the workflow scheme is returned. */
  returnDraftIfExists?: boolean;
}
