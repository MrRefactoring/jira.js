import { PublishedWorkflowId } from "./publishedWorkflowId";
/**Details about a workflow.*/
export interface Workflow {
    id?: PublishedWorkflowId;
    /**The description of the workflow.*/
    description: string;
    /**The transitions of the workflow.*/
    transitions?: Transition[];
    /**The statuses of the workflow.*/
    statuses?: WorkflowStatus[];
}