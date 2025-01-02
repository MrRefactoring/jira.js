import type { Comment } from './comment.mjs';
import { PagedAttachment } from './pagedAttachment.mjs';

export interface AttachmentCreateResult {
  comment?: Comment;
  attachments?: PagedAttachment;
}
