import { Scope } from "./scope";

export interface DeprecatedWorkflow {
    name: string;
    description: string;
    lastModifiedDate: string;
    lastModifiedUser: string;
    lastModifiedUserAccountId: string;
    steps: number;
    scope: Scope[];
    default: boolean;
}