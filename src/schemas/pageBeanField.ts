import { Field } from './field';

export interface PageBeanField {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: Field[];
}
