import { AttachmentArchiveEntry } from './attachmentArchiveEntry';

export interface AttachmentArchive {
  entries?: AttachmentArchiveEntry[];
  moreAvailable?: boolean;
  totalEntryCount?: number;
  totalNumberOfEntriesAvailable?: number;
}
