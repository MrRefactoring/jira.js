import { AttachmentArchiveEntry } from './attachmentArchiveEntry';

export interface AttachmentArchiveImpl {
  entries: AttachmentArchiveEntry[];
  totalEntryCount: number;
}
