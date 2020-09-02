import { IssueTransition } from "./issueTransition";

export interface Transitions {
    expand: string;
    transitions: IssueTransition[];
}