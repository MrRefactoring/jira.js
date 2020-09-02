export interface UserWriteBean {
    self?: string;
    key?: string;
    name?: string;
    password?: string;
    emailAddress: string;
    displayName: string;
    notification?: string;
    applicationKeys?: string[];
    [key: string]: unknown;
}