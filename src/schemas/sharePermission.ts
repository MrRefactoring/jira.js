import { GroupName } from './groupName';
import { Project } from './project';
import { ProjectRole } from './projectRole';

export interface SharePermission {
    id?: number;
    type: string;
    project?: Project[];
    role?: ProjectRole[];
    group?: GroupName[];
}
