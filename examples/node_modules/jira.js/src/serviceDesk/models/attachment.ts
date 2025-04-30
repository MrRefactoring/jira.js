import type { AttachmentLink } from './attachmentLink';
import type { Date } from './date';
import type { User } from './user';

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
