export interface GetAttachmentContent {
  /** The ID of the attachment. */
  id: string;
  /**
   * Whether a redirect is provided for the attachment download. Clients that do not automatically follow redirects can
   * set this to `false` to avoid making multiple requests to download the attachment.
   */
  redirect?: boolean;
}
