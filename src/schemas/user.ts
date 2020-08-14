export interface User {
    self: string;
    key: string;
    accountId: string;
    accountType: string;
    name: string;
    emailAddress: string;
    avatarUrls: any;
    displayName: string;
    active: boolean;
    timeZone: string;
    locale: string;
    groups: any;
    applicationRoles: any;
    expand: string;
}
