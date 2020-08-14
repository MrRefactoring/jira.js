export interface Worklog {
    [key: string]: any;
    self: string;
    author: any;
    updateAuthor: any;
    comment: string;
    created: string;
    updated: string;
    visibility: any;
    started: string;
    timeSpent: string;
    timeSpentSeconds: number;
    id: string;
    issueId: string;
    properties: any[];
}
