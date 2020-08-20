import { FieldConfigurationIssueTypeItem } from './fieldConfigurationIssueTypeItem';

export interface PageBeanFieldConfigurationIssueTypeItem {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: FieldConfigurationIssueTypeItem[];
}
