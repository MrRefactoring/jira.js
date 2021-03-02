import { AttachmentArchiveEntry } from './attachmentArchiveEntry';

export interface AttachmentArchive {
  totalNumberOfEntriesAvailable?: number;
  moreAvailable?: boolean;
  totalEntryCount?: number;
  entries?: AttachmentArchiveEntry[];
}
