import { AttachmentArchiveItemReadable } from "./attachmentArchiveItemReadable";

export interface AttachmentArchiveMetadataReadable {
    id: number;
    name: string;
    entries: AttachmentArchiveItemReadable[];
    totalEntryCount: number;
    mediaType: string;
}