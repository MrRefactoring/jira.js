import { FilterDetails } from "./filterDetails";

export interface PageBeanFilterDetails {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: FilterDetails[];
}