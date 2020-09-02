import { PublishedWorkflowId } from "./publishedWorkflowId";
import { Transition } from "./transition";
import { WorkflowStatus } from "./workflowStatus";

export interface Workflow {
    id?: PublishedWorkflowId[];
    description: string;
    transitions?: Transition[];
    statuses?: WorkflowStatus[];
}