export interface BasicUser {
    key: string;
    self: string;
    name: string;
    displayName: string;
    active: boolean;
    accountId: string;
    avatarUrls: {
        [key: string]: unknown;
    };
}