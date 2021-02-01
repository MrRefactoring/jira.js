import { AttachmentArchiveEntry } from './attachmentArchiveEntry';

export interface AttachmentArchive {
  moreAvailable?: boolean;
  totalNumberOfEntriesAvailable?: number;
  totalEntryCount?: number;
  entries?: AttachmentArchiveEntry[];
}
