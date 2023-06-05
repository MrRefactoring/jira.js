/** Metadata for an item in an attachment archive. */
export interface AttachmentArchiveItemReadable {
  /** The position of the item within the archive. */
  index?: number;
  /** The label for the archive item. */
  label?: string;
  /** The MIME type of the archive item. */
  mediaType?: string;
  /** The path of the archive item. */
  path?: string;
  /** The size of the archive item. */
  size?: string;
}
