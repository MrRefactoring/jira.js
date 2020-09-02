import { FilterSubscription } from "./filterSubscription";
import { SharePermission } from "./sharePermission";
import { User } from "./user";

export interface FilterDetails {
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
    subscriptions?: FilterSubscription[];
}