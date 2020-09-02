import { AvatarUrlsBean } from "./avatarUrlsBean";
import { SimpleListWrapperApplicationRole } from "./simpleListWrapperApplicationRole";
import { SimpleListWrapperGroupName } from "./simpleListWrapperGroupName";

export interface User {
    self: string;
    key: string;
    accountId: string;
    accountType: string;
    name: string;
    emailAddress: string;
    avatarUrls: AvatarUrlsBean[];
    displayName: string;
    active: boolean;
    timeZone: string;
    locale: string;
    groups: SimpleListWrapperGroupName[];
    applicationRoles: SimpleListWrapperApplicationRole[];
    expand: string;
}