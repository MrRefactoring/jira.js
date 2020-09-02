import { ProjectIssueCreateMetadata } from "./projectIssueCreateMetadata";

export interface IssueCreateMetadata {
    expand: string;
    projects: ProjectIssueCreateMetadata[];
}