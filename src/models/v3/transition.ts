import { ScreenID } from "./screenID";
import { WorkflowRules } from "./workflowRules";

export interface Transition {
    id: string;
    name: string;
    description: string;
    from: string[];
    to: string;
    type: string;
    screen?: ScreenID[];
    rules?: WorkflowRules[];
}