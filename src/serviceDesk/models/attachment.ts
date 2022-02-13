import { AttachmentLink } from './attachmentLink';
import { Date } from './date';
import { User } from './user';

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
