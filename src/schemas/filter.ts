import { FilterSubscriptionsList } from './filterSubscriptionsList';
import { SharePermission } from './sharePermission';
import { User } from './user';
import { UserList } from './userList';

export interface Filter {
    self?: string;
    id?: string;
    name: string;
    description?: string;
    owner?: User[];
    jql?: string;
    viewUrl?: string;
    searchUrl?: string;
    favourite?: boolean;
    favouritedCount?: number;
    sharePermissions?: SharePermission[];
    sharedUsers?: UserList[];
    subscriptions?: FilterSubscriptionsList[];
}
