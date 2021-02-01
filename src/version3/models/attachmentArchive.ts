import { AttachmentArchiveEntry } from './attachmentArchiveEntry';

export interface AttachmentArchive {
  totalEntryCount?: number;
  moreAvailable?: boolean;
  totalNumberOfEntriesAvailable?: number;
  entries?: AttachmentArchiveEntry[];
}
