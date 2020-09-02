import { Worklog } from "./worklog";

export interface PageOfWorklogs {
    startAt: number;
    maxResults: number;
    total: number;
    worklogs: Worklog[];
    [key: string]: unknown;
}