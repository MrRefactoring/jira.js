import { Changelog } from './changelog';

export interface PageOfChangelogs {
    startAt: number;
    maxResults: number;
    total: number;
    histories: Changelog[];
}
