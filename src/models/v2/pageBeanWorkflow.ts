import { Workflow } from "./workflow";

export interface PageBeanWorkflow {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: Workflow[];
}