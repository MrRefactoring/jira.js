export interface Attachment {
    [key: string]: any;
    self: string;
    id: string;
    filename: string;
    author: any;
    created: string;
    size: number;
    mimeType: string;
    content: string;
    thumbnail: string;
}
