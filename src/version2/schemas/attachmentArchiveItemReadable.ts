import { z } from 'zod';

/** Metadata for an item in an attachment archive. */
export const AttachmentArchiveItemReadableSchema = z.object({
  /** The position of the item within the archive. */
  index: z.number().int().optional(),
  /** The label for the archive item. */
  label: z.string().optional(),
  /** The MIME type of the archive item. */
  mediaType: z.string().optional(),
  /** The path of the archive item. */
  path: z.string().optional(),
  /** The size of the archive item. */
  size: z.string().optional(),
});

export type AttachmentArchiveItemReadable = z.infer<typeof AttachmentArchiveItemReadableSchema>;
