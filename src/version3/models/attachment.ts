import { UserDetails } from './userDetails';

/** Details about an attachment. */
export interface Attachment {
  /** The URL of the attachment details response. */
  self?: string;
  /** The ID of the attachment. */
  id?: string;
  /** The file name of the attachment. */
  filename?: string;
  author?: UserDetails;
  /** The datetime the attachment was created. */
  created?: string;
  /** The size of the attachment. */
  size?: number;
  /** The MIME type of the attachment. */
  mimeType?: string;
  /** The content of the attachment. */
  content?: string;
  /** The URL of a thumbnail representing the attachment. */
  thumbnail?: string;
}
