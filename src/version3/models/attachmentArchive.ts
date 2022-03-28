import { AttachmentArchiveEntry } from './attachmentArchiveEntry';

export interface AttachmentArchive {
  totalNumberOfEntriesAvailable?: number;
  totalEntryCount?: number;
  moreAvailable?: boolean;
  entries?: AttachmentArchiveEntry[];
}
