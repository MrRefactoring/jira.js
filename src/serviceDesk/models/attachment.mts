import { AttachmentLink } from './attachmentLink.mjs';
import { Date } from './date.mjs';
import { User } from './user.mjs';

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
