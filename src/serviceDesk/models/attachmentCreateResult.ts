import { Comment } from './comment';
import { PagedAttachment } from './pagedAttachment';

export interface AttachmentCreateResult {
  comment?: Comment;
  attachments?: PagedAttachment;
}
