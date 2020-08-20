import { Version } from './version';

export interface PageBeanVersion {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: Version[];
}
