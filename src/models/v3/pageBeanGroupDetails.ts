import { GroupDetails } from "./groupDetails";

export interface PageBeanGroupDetails {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: GroupDetails[];
}