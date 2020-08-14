export interface Filter {
    self: string;
    id: string;
    name: string;
    description: string;
    owner: any;
    jql: string;
    viewUrl: string;
    searchUrl: string;
    favourite: boolean;
    favouritedCount: number;
    sharePermissions: any[];
    sharedUsers: any;
    subscriptions: any;
}
