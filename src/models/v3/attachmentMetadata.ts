import { User } from "./user";

export interface AttachmentMetadata {
    id: number;
    self: string;
    filename: string;
    author: User[];
    created: string;
    size: number;
    mimeType: string;
    properties: {
        [key: string]: unknown;
    };
    content: string;
    thumbnail: string;
}