import { AttachmentArchiveEntry } from './attachmentArchiveEntry';

export interface AttachmentArchiveImpl {
  /** The list of the items included in the archive. */
  entries?: AttachmentArchiveEntry[];
  /** The number of items in the archive. */
  totalEntryCount?: number;
}
