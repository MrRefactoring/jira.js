import { ProjectRoleGroup } from './projectRoleGroup';
import { ProjectRoleUser } from './projectRoleUser';

export interface RoleActor {
  id: number;
  displayName: string;
  type: string;
  name: string;
  avatarUrl: string;
  actorUser: ProjectRoleUser[];
  actorGroup: ProjectRoleGroup[];
}
