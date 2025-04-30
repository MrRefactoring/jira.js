import type { UserDetails } from './userDetails';

/** Details about an attachment. */
export interface Attachment {
  author?: UserDetails;
  /** The content of the attachment. */
  content?: string;
  /** The datetime the attachment was created. */
  created?: string;
  /** The file name of the attachment. */
  filename?: string;
  /** The ID of the attachment. */
  id: string;
  /** The MIME type of the attachment. */
  mimeType?: string;
  /** The URL of the attachment details response. */
  self?: string;
  /** The size of the attachment. */
  size?: number;
  /** The URL of a thumbnail representing the attachment. */
  thumbnail?: string;
}
