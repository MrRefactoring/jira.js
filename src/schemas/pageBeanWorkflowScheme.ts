import { WorkflowScheme } from './workflowScheme';

export interface PageBeanWorkflowScheme {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: WorkflowScheme[];
}
