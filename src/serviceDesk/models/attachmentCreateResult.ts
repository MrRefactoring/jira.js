import type { Comment } from './comment.js';
import type { PagedAttachment } from './pagedAttachment.js';

export interface AttachmentCreateResult {
  comment?: Comment;
  attachments?: PagedAttachment;
}
