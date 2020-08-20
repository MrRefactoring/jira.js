import { StatusDetails } from './statusDetails';

export interface IssueTypeWithStatus {
    self: string;
    id: string;
    name: string;
    subtask: boolean;
    statuses: StatusDetails[];
}
