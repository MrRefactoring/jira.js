export interface TaskProgressBeanObject {
    self: string;
    id: string;
    description?: string;
    status: string;
    message?: string;
    result?: any;
    submittedBy: number;
    progress: number;
    elapsedRuntime: number;
    submitted: number;
    started?: number;
    finished?: number;
    lastUpdate: number;
}
