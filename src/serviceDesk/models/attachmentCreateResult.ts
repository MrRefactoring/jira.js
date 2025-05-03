import type { Comment } from './comment';
import type { PagedAttachment } from './pagedAttachment';

export interface AttachmentCreateResult {
  comment?: Comment;
  attachments?: PagedAttachment;
}
