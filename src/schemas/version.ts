export interface Version {
    expand: string;
    self: string;
    id: string;
    description: string;
    name: string;
    archived: boolean;
    released: boolean;
    startDate: string;
    releaseDate: string;
    overdue: boolean;
    userStartDate: string;
    userReleaseDate: string;
    project: string;
    projectId: number;
    moveUnfixedIssuesTo: string;
    operations: any[];
    issuesStatusForFixVersion: any;
}
