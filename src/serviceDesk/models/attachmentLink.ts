export interface AttachmentLink {
  self?: string;
  /** REST API URL for the attachment */
  jiraRest?: string;
  /** URL for the attachment. */
  content?: string;
  /** URL for the attachment's thumbnail image. */
  thumbnail?: string;
}
