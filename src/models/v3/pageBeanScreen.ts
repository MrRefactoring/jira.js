import { Screen } from "./screen";

export interface PageBeanScreen {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: Screen[];
}