export interface VersionIssuesStatus {
    unmapped: number;
    toDo: number;
    inProgress: number;
    done: number;
    [key: string]: unknown;
}