import { FieldDetails } from './fieldDetails';
import { GroupName } from './groupName';
import { ProjectRole } from './projectRole';
import { UserDetails } from './userDetails';

export interface EventNotification {
    expand: string;
    id: number;
    notificationType: string;
    parameter: string;
    group: GroupName[];
    field: FieldDetails[];
    emailAddress: string;
    projectRole: ProjectRole[];
    user: UserDetails[];
}
