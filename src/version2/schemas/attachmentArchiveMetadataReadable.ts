import { z } from 'zod';
import { AttachmentArchiveItemReadableSchema } from './attachmentArchiveItemReadable';

/** Metadata for an archive (for example a zip) and its contents. */
export const AttachmentArchiveMetadataReadableSchema = z.object({
  /** The list of the items included in the archive. */
  entries: z.array(AttachmentArchiveItemReadableSchema).optional(),
  /** The ID of the attachment. */
  id: z.number().int().optional(),
  /** The MIME type of the attachment. */
  mediaType: z.string().optional(),
  /** The name of the archive file. */
  name: z.string().optional(),
  /** The number of items included in the archive. */
  totalEntryCount: z.number().int().optional(),
});

export type AttachmentArchiveMetadataReadable = z.infer<typeof AttachmentArchiveMetadataReadableSchema>;
