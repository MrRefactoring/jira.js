export interface GetApprovalById {
  /** The ID or key of the customer request the approval is on. */
  issueIdOrKey: string;
  /** The ID of the approval to be returned. */
  approvalId: number;
}
