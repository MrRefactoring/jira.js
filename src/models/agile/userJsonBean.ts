export interface UserJsonBean {
    self: string;
    name: string;
    key: string;
    accountId: string;
    emailAddress: string;
    avatarUrls: {
        [key: string]: unknown;
    };
    displayName: string;
    active: boolean;
    timeZone: string;
    accountType: string;
}