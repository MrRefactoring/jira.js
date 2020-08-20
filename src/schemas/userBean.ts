import { UserBeanAvatarUrls } from './userBeanAvatarUrls';

export interface UserBean {
    key: string;
    self: string;
    name: string;
    displayName: string;
    active: boolean;
    accountId: string;
    avatarUrls: UserBeanAvatarUrls[];
}
