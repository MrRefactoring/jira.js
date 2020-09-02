import { StatusDetails } from "./statusDetails";

export interface IssueTransition {
    id: string;
    name: string;
    to: StatusDetails[];
    hasScreen: boolean;
    isGlobal: boolean;
    isInitial: boolean;
    isAvailable: boolean;
    isConditional: boolean;
    fields: {
        [key: string]: unknown;
    };
    expand: string;
    [key: string]: unknown;
}