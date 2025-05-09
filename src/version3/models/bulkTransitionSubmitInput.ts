export interface BulkTransitionSubmitInput {
  /** List of all the issue IDs or keys that are to be bulk transitioned. */
  selectedIssueIdsOrKeys: string[];
  /** The ID of the transition that is to be performed on the issues. */
  transitionId: string;
}
