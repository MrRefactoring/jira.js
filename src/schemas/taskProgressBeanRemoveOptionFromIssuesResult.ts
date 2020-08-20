import { RemoveOptionFromIssuesResult } from './removeOptionFromIssuesResult';

export interface TaskProgressBeanRemoveOptionFromIssuesResult {
    self: string;
    id: string;
    description?: string;
    status: string;
    message?: string;
    result?: RemoveOptionFromIssuesResult[];
    submittedBy: number;
    progress: number;
    elapsedRuntime: number;
    submitted: number;
    started?: number;
    finished?: number;
    lastUpdate: number;
}
