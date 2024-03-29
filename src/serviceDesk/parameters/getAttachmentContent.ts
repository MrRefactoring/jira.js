export interface GetAttachmentContent {
  /** The ID or key for the customer request the attachment is associated with */
  issueIdOrKey: string;
  /** The ID for the attachment */
  attachmentId: number;
}
