export interface Notificationrecipients {
    [key: string]: any;
    reporter: boolean;
    assignee: boolean;
    watchers: boolean;
    voters: boolean;
    users: any[];
    groups: any[];
}
