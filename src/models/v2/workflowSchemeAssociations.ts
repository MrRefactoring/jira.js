import { WorkflowScheme } from "./workflowScheme";

export interface WorkflowSchemeAssociations {
    projectIds: string[];
    workflowScheme?: WorkflowScheme[];
}