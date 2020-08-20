import { FoundFilter } from './foundFilter';

export interface PageBeanFoundFilter {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: FoundFilter[];
}
