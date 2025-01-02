import type { AttachmentLink } from './attachmentLink.js';
import type { Date } from './date.js';
import type { User } from './user.js';

export interface Attachment {
  /** Filename of the item attached. */
  filename?: string;
  author?: User;
  created?: Date;
  /** Size of the attachment in bytes. */
  size?: number;
  /** MIME type of the attachment. */
  mimeType?: string;
  Links?: AttachmentLink;
}
