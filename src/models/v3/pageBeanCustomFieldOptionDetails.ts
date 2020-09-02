import { CustomFieldOptionDetails } from "./customFieldOptionDetails";

export interface PageBeanCustomFieldOptionDetails {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: CustomFieldOptionDetails[];
}