import { FieldConfiguration } from "./fieldConfiguration";

export interface PageBeanFieldConfiguration {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: FieldConfiguration[];
}