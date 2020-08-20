import { AvatarUrlsBean } from './avatarUrlsBean';

export interface UserDetails {
    self: string;
    name: string;
    key: string;
    accountId: string;
    emailAddress: string;
    avatarUrls: AvatarUrlsBean[];
    displayName: string;
    active: boolean;
    timeZone: string;
    accountType: string;
}
