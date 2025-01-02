export interface GetAttachmentThumbnail {
  /** The ID or key for the customer request the attachment is associated with */
  issueIdOrKey: string;
  /** The ID of the attachment. */
  attachmentId: number;
}
