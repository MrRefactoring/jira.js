import type { AttachmentCreate } from '../models/index.js';

export interface CreateAttachment extends AttachmentCreate {
  /** The ID or key of the customer request to which the attachment will be added. */
  issueIdOrKey: string;
}
