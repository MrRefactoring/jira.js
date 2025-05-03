import type { User } from './user';

/** Metadata for an issue attachment. */
export interface AttachmentMetadata {
  /** The ID of the attachment. */
  id?: number;
  /** The URL of the attachment metadata details. */
  self?: string;
  /** The name of the attachment file. */
  filename?: string;
  author?: User;
  /** The datetime the attachment was created. */
  created?: string;
  /** The size of the attachment. */
  size?: number;
  /** The MIME type of the attachment. */
  mimeType?: string;
  /** Additional properties of the attachment. */
  properties?: unknown;
  /** The URL of the attachment. */
  content?: string;
  /** The URL of a thumbnail representing the attachment. */
  thumbnail?: string;
  /**
   * The file ID of the attachment in the media store. See the [Media
   * API](https://developer.atlassian.com/platform/media/) documentation for more details.
   */
  mediaApiFileId?: string;
}
