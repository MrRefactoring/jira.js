import { AdditionalComment } from './additionalComment';

export interface AttachmentCreate {
  /** List of IDs for the temporary attachments to be added to the customer request. */
  temporaryAttachmentIds?: string[];
  additionalComment?: AdditionalComment;
  /** Indicates whether the attachments are to be public (true) or private/internal (false). */
  public?: boolean;
}
