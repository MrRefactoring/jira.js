import { FieldConfigurationItem } from './fieldConfigurationItem';

export interface PageBeanFieldConfigurationItem {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: FieldConfigurationItem[];
}
