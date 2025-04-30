import type { AttachmentArchiveItemReadable } from './attachmentArchiveItemReadable';

/** Metadata for an archive (for example a zip) and its contents. */
export interface AttachmentArchiveMetadataReadable {
  /** The list of the items included in the archive. */
  entries?: AttachmentArchiveItemReadable[];
  /** The ID of the attachment. */
  id?: number;
  /** The MIME type of the attachment. */
  mediaType?: string;
  /** The name of the archive file. */
  name?: string;
  /** The number of items included in the archive. */
  totalEntryCount?: number;
}
