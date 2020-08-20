import { RoleActor } from './roleActor';
import { Scope } from './scope';

export interface ProjectRole {
    self: string;
    name: string;
    id: number;
    description: string;
    actors: RoleActor[];
    scope: Scope[];
    translatedName: string;
    currentUserRole: boolean;
    admin: boolean;
    roleConfigurable: boolean;
    default: boolean;
}
