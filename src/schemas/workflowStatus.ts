import { WorkflowStatusProperties } from './workflowStatusProperties';

export interface WorkflowStatus {
    id: string;
    name: string;
    properties?: WorkflowStatusProperties[];
}
