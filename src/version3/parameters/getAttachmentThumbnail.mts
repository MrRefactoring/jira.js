export interface GetAttachmentThumbnail {
  /** The ID of the attachment. */
  id: string;
  /**
   * Whether a redirect is provided for the attachment download. Clients that do not automatically follow redirects can
   * set this to `false` to avoid making multiple requests to download the attachment.
   */
  redirect?: boolean;
  /** Whether a default thumbnail is returned when the requested thumbnail is not found. */
  fallbackToDefault?: boolean;
  /** The maximum width to scale the thumbnail to. */
  width?: number;
  /** The maximum height to scale the thumbnail to. */
  height?: number;
}
