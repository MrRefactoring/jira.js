/** Approval configuration. */
export interface ApprovalConfigurationPreview {
  /** The active approval configuration. */
  active?: string;
  /** The transition ID for approved state. */
  transitionApproved?: string;
  /** The transition ID for rejected state. */
  transitionRejected?: string;
}
