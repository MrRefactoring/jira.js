import { UserDetails } from './userDetails';

export interface Attachment {
    self: string;
    id: string;
    filename: string;
    author: UserDetails[];
    created: string;
    size: number;
    mimeType: string;
    content: string;
    thumbnail: string;
    [key: string]: unknown;
}
