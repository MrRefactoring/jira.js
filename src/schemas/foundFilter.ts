export interface Foundfilter {
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
    subscriptions: any[];
}
