import { ChangedWorklog } from "./changedWorklog";

export interface ChangedWorklogs {
    values: ChangedWorklog[];
    since: number;
    until: number;
    self: string;
    nextPage: string;
    lastPage: boolean;
}