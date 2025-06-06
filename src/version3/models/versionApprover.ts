/** Contains details about a version approver. */
export interface VersionApprover {
  /** The Atlassian account ID of the approver. */
  accountId?: string;
  /** A description of why the user is declining the approval. */
  declineReason?: string;
  /** A description of what the user is approving within the specified version. */
  description?: string;
  /** The status of the approval, which can be _PENDING_, _APPROVED_, or _DECLINED_ */
  status?: 'PENDING' | 'APPROVED' | 'DECLINED' | string;
}
