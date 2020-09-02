import { GroupName } from "./groupName";
import { UserDetails } from "./userDetails";

export interface NotificationRecipients {
    reporter: boolean;
    assignee: boolean;
    watchers: boolean;
    voters: boolean;
    users: UserDetails[];
    groups: GroupName[];
    [key: string]: unknown;
}